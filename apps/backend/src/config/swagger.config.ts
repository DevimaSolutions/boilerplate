import fs from 'node:fs/promises';

import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import envConfig from './env.config';

import type { INestApplication } from '@nestjs/common';

const updateSwaggerSpecFile = async (document: OpenAPIObject) => {
  // This is a relative path from the `backend` project root
  const swaggerSpecFileLocation = '../../packages/api-client/swagger-spec.json';

  // Just fire and forget this to avoid blocking application bootstrap function
  await fs.writeFile(swaggerSpecFileLocation, JSON.stringify(document)).catch(() => {
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

    .addCookieAuth('next-auth.session-token', {
      type: 'apiKey',
      scheme: 'basic',
      name: 'next-auth.session-token',
      description:
        'Cookie-based authentication. </br>' +
        'Enter your token (without the "Bearer" word) in the text input below.',
    })
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        description: 'API key to access the server-to-server API',
        in: 'header',
      },
      'x-api-key',
    );

  if (frontendProxyPath) {
    builder.addServer(`${frontendHostUrl}${frontendProxyPath}`);
  }

  const config = builder.build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerUiRoute = 'docs';

  SwaggerModule.setup(swaggerUiRoute, app, document, {
    swaggerOptions: {
      requestInterceptor: (req: RequestInit) => {
        req.credentials = 'include';
        return req;
      },
    },
  });

  return updateSwaggerSpecFile(document);
};

export default configureSwagger;
