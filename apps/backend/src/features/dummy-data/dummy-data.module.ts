import { Module } from '@nestjs/common';

import { DummyDataController } from './dummy-data.controller';
import { DummyDataService } from './dummy-data.service';

@Module({
  providers: [DummyDataService],
  controllers: [DummyDataController],
})
export class DummyDataModule {}
