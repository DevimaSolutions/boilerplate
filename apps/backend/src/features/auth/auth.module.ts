import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import envConfig from '../../config/env.config';
import { MailingModule } from '../mailing/mailing.module';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService, JwtOtpService, JwtRefreshService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

export const JwtAsyncModule = JwtModule.registerAsync({
  useFactory: (config: ConfigType<typeof envConfig>) => {
    return {
      secret: config.auth.jwtSecret,
      signOptions: { expiresIn: config.auth.authTokenDuration },
    };
  },
  inject: [{ token: envConfig.KEY, optional: false }],
});

@Module({
  imports: [UsersModule, PassportModule, JwtAsyncModule, MailingModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshService, JwtOtpService],
  exports: [AuthService],
})
export class AuthModule {}
