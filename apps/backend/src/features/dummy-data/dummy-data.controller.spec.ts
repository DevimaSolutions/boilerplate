import { Test, TestingModule } from '@nestjs/testing';

import { createMockedServiceProvider } from 'test/mocks';

import { DummyDataController } from './dummy-data.controller';
import { DummyDataService } from './dummy-data.service';

describe('DummyDataController', () => {
  let controller: DummyDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DummyDataController],
      providers: [createMockedServiceProvider(DummyDataService)],
    }).compile();

    controller = module.get<DummyDataController>(DummyDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
