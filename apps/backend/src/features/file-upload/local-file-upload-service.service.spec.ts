import { Test, TestingModule } from '@nestjs/testing';

import envConfig from 'src/config/env.config';

import { LocalFileUploadService } from './local-file-upload-service.service';

describe('LocalFileUploadServiceService', () => {
  let service: LocalFileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalFileUploadService,
        {
          provide: envConfig.KEY,
          useValue: {
            frontendHostUrl: 'http://localhost:3000',
            frontendProxyPath: '/api',
          },
        },
      ],
    }).compile();

    service = module.get<LocalFileUploadService>(LocalFileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
