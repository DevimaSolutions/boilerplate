import { ApiProperty } from '@nestjs/swagger';

import { PaginationQueryDto } from './pagination-query.dto';

export class PaginationResponseDto<TData> extends PaginationQueryDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: 'object' })
  data: TData[];
}
