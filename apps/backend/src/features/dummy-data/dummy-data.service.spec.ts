import { Test, TestingModule } from '@nestjs/testing';

import { DummyDataService } from './dummy-data.service';

describe('DummyDataService', () => {
  let service: DummyDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DummyDataService],
    }).compile();

    service = module.get<DummyDataService>(DummyDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
