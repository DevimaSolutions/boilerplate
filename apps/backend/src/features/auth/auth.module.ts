import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LoggerModule } from '../logger/logger.module';
import { MailingModule } from '../mailing/mailing.module';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService, JwtOtpService } from './services';
import { ApiKeyStrategy, CookieStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [UsersModule, PassportModule, MailingModule, LoggerModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, CookieStrategy, ApiKeyStrategy, JwtOtpService],
  exports: [AuthService],
})
export class AuthModule {}
