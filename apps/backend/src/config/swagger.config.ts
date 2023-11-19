import fs from 'node:fs/promises';

import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import envConfig from './env.config';

import type { INestApplication } from '@nestjs/common';

const updateSwaggerSpecFile = (document: OpenAPIObject) => {
  // This is a relative path from the `backend` project root
  const swaggerSpecFileLocation = '../../packages/api-client/swagger-spec.json';

  // Just fire and forget this to avoid blocking application bootstrap function
  void fs.writeFile(swaggerSpecFileLocation, JSON.stringify(document)).catch(() => {
    console.warn('Failed to update "swagger-spec.json"');
  });
  // From here the `gen:api-client` script in `api-client` package
  // takes care of further code generation.
};

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

  updateSwaggerSpecFile(document);
};

export default configureSwagger;
