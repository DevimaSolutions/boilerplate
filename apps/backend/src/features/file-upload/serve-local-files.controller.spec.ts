import { Test, TestingModule } from '@nestjs/testing';

import { createMockedServiceProvider } from 'test/mocks';

import { LocalFileUploadService } from './local-file-upload-service.service';
import { ServeLocalFilesController } from './serve-local-files.controller';

describe('ServeLocalFilesController', () => {
  let controller: ServeLocalFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServeLocalFilesController],
      providers: [createMockedServiceProvider(LocalFileUploadService)],
    }).compile();

    controller = module.get<ServeLocalFilesController>(ServeLocalFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
