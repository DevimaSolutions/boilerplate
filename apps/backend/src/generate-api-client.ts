import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import configureSwagger from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await configureSwagger(app);
}

void bootstrap();
