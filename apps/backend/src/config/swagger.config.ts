import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import envConfig from './env.config';

import type { INestApplication } from '@nestjs/common';

const configureSwagger = (app: INestApplication) => {
  const { appName, frontendHostUrl, frontendProxyPath } = envConfig();

  const builder = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`The ${appName} app API description`)
    .setVersion('v1')

    .addBearerAuth({
      type: 'http',
      description:
        'JWT Authorization header using the Bearer scheme. </br>' +
        'Enter your token (without the "Bearer" word) in the text input below.',
    });

  if (frontendProxyPath) {
    builder.addServer(`${frontendHostUrl}${frontendProxyPath}`);
  }

  const config = builder.build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerUiRoute = 'docs';

  SwaggerModule.setup(swaggerUiRoute, app, document);
};

export default configureSwagger;
