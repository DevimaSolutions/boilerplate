import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { MailingService } from '../../mailing';
import { User } from '../../users/entities';
import { UsersService } from '../../users/users.service';
import { JwtTokens, SignUpDto } from '../dto';
import { UserRole } from '../enums';
import { IJwtSub, JwtPayload } from '../interfaces';

import { JwtOtpService } from './jwt-otp.service';
import { JwtRefreshService } from './jwt-refresh.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private jwtOtpService: JwtOtpService,
    private jwtRefreshService: JwtRefreshService,
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

  async validateUserPayload(payload: JwtPayload): Promise<User | null> {
    try {
      const user = await this.usersService.findOne(payload.sub);
      return user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        // User was not found
        return null;
      }
      throw e;
    }
  }

  async createJwtTokenPair(user: User): Promise<JwtTokens> {
    const payload: JwtPayload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtRefreshService.signAsync({ sub: user.id.toString() }),
    };
  }

  async signIn(user: User) {
    return this.createJwtTokenPair(user);
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

  async refreshAccessToken(refreshToken: string) {
    try {
      const { sub } = await this.jwtRefreshService.verifyAsync<IJwtSub>(refreshToken);
      const user = await this.usersService.findOne(sub);
      return this.createJwtTokenPair(user);
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

    return this.createJwtTokenPair(user);
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
