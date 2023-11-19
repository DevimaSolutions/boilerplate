import { Inject, Injectable } from '@nestjs/common';

import envConfig from 'src/config/env.config';

import type { ConfigType } from '@nestjs/config';

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
