import { Test } from '@nestjs/testing';

import { createMockedServiceProvider, mockFactory } from 'test/mocks';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import type { TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [createMockedServiceProvider(AppService)],
    })
      .useMocker(mockFactory)
      .compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should be healthy', () => {
      jest
        .spyOn(appService, 'getHealthCheck')
        .mockReturnValueOnce({ app: 'test', isHealthy: true, apiDocsPath: '/docs' });

      const { isHealthy } = appController.getHealthCheck();

      expect(isHealthy).toBeTruthy();
    });
  });
});
