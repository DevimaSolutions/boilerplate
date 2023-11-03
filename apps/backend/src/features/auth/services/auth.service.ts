import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { decode } from 'next-auth/jwt';

import envConfig from '../../../config/env.config';
import { MailingService } from '../../mailing';
import { User } from '../../users/entities';
import { UsersService } from '../../users/users.service';
import { SignUpDto } from '../dto';
import { UserRole } from '../enums';
import { IJwtSub } from '../interfaces';

import { JwtOtpService } from './jwt-otp.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
    private usersService: UsersService,
    private jwtOtpService: JwtOtpService,
    private mailingService: MailingService,
  ) {}

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

      const user = await this.usersService.findOne(payload.sub);
      return user;
    } catch (e) {
      // User was not found
      return null;
    }
  }

  async createOtpToken(email: string): Promise<string> {
    const userData = await this.usersService.findActiveByEmail(email);

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

    await this.mailingService.sendWelcomeEmail(user.email, { username: user.email });

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

  async resetPassword(token: string, password: string) {
    const userId = await this.verifyOtpToken(token);

    await this.usersService.updatePassword(userId, password);
  }
}
