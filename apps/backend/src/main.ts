import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import envConfig from './config/env.config';
import configureSwagger from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create logger using factory defined in src/features/logger/logger.module.ts
  app.useLogger(app.get(Logger));

  app.use(cookieParser());

  const { port, enableSwagger, allowedOrigins } = envConfig();

  if (enableSwagger) {
    await configureSwagger(app);
  }

  if (allowedOrigins.length > 0) {
    app.enableCors({ origin: allowedOrigins });
  }

  await app.listen(port);
}

void bootstrap();
