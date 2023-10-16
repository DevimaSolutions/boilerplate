import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import envConfig from '../config/env.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {}

  getHealthCheck() {
    return { app: this.config.appName, isHealthy: true, apiDocsPath: '/docs' };
  }
}
