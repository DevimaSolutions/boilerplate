import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import envConfig from 'src/config/env.config';

@Injectable()
export class JwtRefreshService extends JwtService {
  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {
    super({
      secret: config.auth.jwtRefreshSecret,
      signOptions: { expiresIn: config.auth.refreshTokenDuration },
    });
  }
}
