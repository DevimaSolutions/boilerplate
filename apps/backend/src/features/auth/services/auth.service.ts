import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { decode } from 'next-auth/jwt';

import envConfig from 'src/config/env.config';
import { MailingService } from 'src/features/mailing';
import { User, UsersRepository, UsersService } from 'src/features/users';

import { GoogleAccountDto, SignUpDto } from '../dto';
import { AzureAdAccountDto } from '../dto/azure-ad-account.dto';
import { UserRole, UserStatus } from '../enums';
import { IJwtSub } from '../interfaces';

import { JwtOtpService } from './jwt-otp.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
    private usersService: UsersService,
    private usersRepository: UsersRepository,
    private jwtOtpService: JwtOtpService,
    private mailingService: MailingService,
    private logger: Logger,
  ) {}

  validateApiKey(apiKey: string) {
    return this.config.auth.apiKey === apiKey;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findActiveByEmail(email);

      if (!user.password) {
        throw new ForbiddenException();
      }

      const doPasswordsMatch = await bcrypt.compare(password, user.password);
      if (doPasswordsMatch) {
        return user;
      }
      return null;
    } catch (e) {
      if (e instanceof NotFoundException) {
        // User was not found
        return null;
      }
      throw e;
    }
  }

  async validateUserPayload(token: string | undefined): Promise<User | null> {
    try {
      const payload = await decode({ token, secret: this.config.auth.jwtSecret });

      if (!payload?.sub) {
        return null;
      }

      const user = await this.usersService.findBySessionId(payload.sub);
      return user;
    } catch (e) {
      // User was not found
      return null;
    }
  }

  async linkOrCreateByGoogleAccount(googleAccount: GoogleAccountDto) {
    try {
      const user = await this.usersService.findByEmail(googleAccount.email);
      if (user.status !== UserStatus.Active) {
        throw new NotFoundException();
      }

      return await this.usersService.updateGoogleAccount(user.id, {
        googleAccountId: googleAccount.accountId,
        imageUri: googleAccount.imageUri,
        isEmailVerified: true,
      });
    } catch (e) {
      if (e instanceof NotFoundException) {
        // user with this email does not exist
        // create new profile using google account data
        return this.usersService.createByGoogleAccount(googleAccount);
      }
      throw e;
    }
  }

  async linkOrCreateByAzureAdAccount(azureAdAccount: AzureAdAccountDto) {
    try {
      const user = await this.usersService.findByEmail(azureAdAccount.email);
      if (user.status !== UserStatus.Active) {
        throw new NotFoundException();
      }

      return await this.usersService.updateByAzureAdAccount(user.id, {
        azureAdAccountId: azureAdAccount.accountId,
        isEmailVerified: true,
      });
    } catch (e) {
      if (e instanceof NotFoundException) {
        // user with this email does not exist
        // create new profile using google account data
        return this.usersService.createByAzureAdAccount(azureAdAccount);
      }
      throw e;
    }
  }

  async validateGoogleAccount(googleAccount: GoogleAccountDto) {
    try {
      const user = await this.usersService.findByGoogleAccountId(googleAccount.accountId);
      if (user.status !== UserStatus.Active) {
        throw new NotFoundException();
      }
      // user already exist
      return user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        // user with this google account id does not exist
        // try to check if user is already signed up by email and attach google account to his profile
        // or create new profile if email is not taken
        return this.linkOrCreateByGoogleAccount(googleAccount);
      }
      throw e;
    }
  }

  async validateAzureAdAccount(azureAdAccount: AzureAdAccountDto) {
    try {
      const user = await this.usersService.findByAzureAdAccountId(azureAdAccount.accountId);
      if (user.status !== UserStatus.Active) {
        throw new NotFoundException();
      }
      // user already exist
      return user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        // user with this google account id does not exist
        // try to check if user is already signed up by email and attach google account to his profile
        // or create new profile if email is not taken
        return this.linkOrCreateByAzureAdAccount(azureAdAccount);
      }
      throw e;
    }
  }

  async createOtpToken(email: string): Promise<string> {
    const userData = await this.usersService.findByEmail(email);

    if (userData.status === UserStatus.Blocked) {
      throw new NotFoundException();
    }
    return this.jwtOtpService.signAsync({ sub: userData.id });
  }

  async verifyOtpToken(token: string) {
    try {
      const result: IJwtSub = await this.jwtOtpService.verifyAsync(token);
      return result.sub;
    } catch {
      throw new BadRequestException();
    }
  }

  async signUp({ email, password }: SignUpDto) {
    const user = await this.usersService.create({
      email,
      password,
      role: UserRole.User,
    });

    const token = await this.createOtpToken(email);
    void this.mailingService
      .sendConfirmationEmail(user.email, user.email, token)
      .catch((e: unknown) => {
        this.logger.error(e, e instanceof Error ? e.stack : undefined, AuthService.name);
      });
    return user;
  }

  async sendForgotEmail(email: string) {
    try {
      const token = await this.createOtpToken(email);

      await this.mailingService.sendForgotPasswordEmail(email, token);
    } catch (e) {
      if (e instanceof NotFoundException) {
        // User was not found, suppress the error
        return;
      }

      throw e;
    }
  }

  async confirmEmail(token: string) {
    const userId = await this.verifyOtpToken(token);

    await this.usersRepository.update(userId, { isEmailVerified: true });
    return this.usersService.findActive(userId);
  }

  async resetPassword(token: string, password: string) {
    const userId = await this.verifyOtpToken(token);

    await this.usersService.updatePassword(userId, password);
  }
}
