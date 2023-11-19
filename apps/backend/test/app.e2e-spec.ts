import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from 'src/app/app.module';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    const result = JSON.stringify({ app: 'Boilerplate', isHealthy: true, apiDocsPath: '/docs' });
    return request(app.getHttpServer()).get('/').expect(200).expect(result);
  });
});
