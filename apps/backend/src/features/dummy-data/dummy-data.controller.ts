import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiOkResponsePaginated } from '../common/decorators/api-ok-response-paginated.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ZodValidationPipe } from '../common/pipes';
import { paginationQuerySchema } from '../common/validations';

import { DummyDataDto } from './dto/dummy-data.dto';
import { DummyDataService } from './dummy-data.service';

@ApiTags('Dummy data')
@Controller('dummy-data')
export class DummyDataController {
  constructor(private dummyDataService: DummyDataService) {}

  @Get()
  @ApiOkResponsePaginated(DummyDataDto)
  getData(@Query(new ZodValidationPipe(paginationQuerySchema)) query: PaginationQueryDto) {
    return this.dummyDataService.getData(query);
  }
}
