import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import envConfig from 'src/config/env.config';

@Injectable()
export class JwtOtpService extends JwtService {
  constructor(
    @Inject(envConfig.KEY)
    config: ConfigType<typeof envConfig>,
  ) {
    super({
      secret: config.auth.otpJwtSecret,
      signOptions: { expiresIn: config.auth.otpTokenDuration },
    });
  }
}
