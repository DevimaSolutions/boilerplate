import { Test } from '@nestjs/testing';

import { mockFactory } from '../../../test/mocks';

import { AwsService } from './aws.service';

import type { TestingModule } from '@nestjs/testing';

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsService],
    })
      .useMocker(mockFactory)
      .compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
