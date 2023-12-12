import { Test } from '@nestjs/testing';

import { mockFactory } from '../../../test/mocks';

import { S3FileUploadService } from './s3-file-upload.service';

import type { TestingModule } from '@nestjs/testing';

describe('S3FileUploadService', () => {
  let service: S3FileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3FileUploadService],
    })
      .useMocker(mockFactory)
      .compile();

    service = module.get<S3FileUploadService>(S3FileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
