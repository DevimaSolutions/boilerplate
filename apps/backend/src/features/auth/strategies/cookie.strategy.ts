import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';

import envConfig from 'src/config/env.config';

import { AuthService } from '../services';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(envConfig.KEY)
    config: ConfigType<typeof envConfig>,
    private authService: AuthService,
  ) {
    super({
      cookieName: 'session-token',
      signed: config.frontendHostUrl.startsWith('https'),
    });
  }

  async validate(token: string | undefined) {
    const user = await this.authService.validateUserPayload(token);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
