import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import envConfig from '../../config/env.config';

import { AwsService } from './aws.service';

import type { TestingModule } from '@nestjs/testing';

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [envConfig],
          cache: true,
          isGlobal: true,
        }),
      ],
      providers: [AwsService],
    }).compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
