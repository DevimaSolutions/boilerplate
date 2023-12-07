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
    const areDocsEnabled = this.config.enableSwagger;
    const docsBaseUrl = this.config.frontendProxyPath
      ? `${this.config.frontendHostUrl}${this.config.frontendProxyPath}`
      : '';

    const apiDocsPath = areDocsEnabled ? `${docsBaseUrl}/docs` : '';

    // TODO: add database connection check (and other services if any)
    return { app: this.config.appName, isHealthy: true, apiDocsPath };
  }
}
