import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';

import { DummyDataDto } from './dto/dummy-data.dto';

@Injectable()
export class DummyDataService {
  TOTAL_ITEMS = 93;

  getData(params: PaginationQueryDto): PaginationResponseDto<DummyDataDto> {
    const itemsLeft = Math.max(this.TOTAL_ITEMS - params.offset, 0);
    const countToGenerate = Math.min(params.limit, itemsLeft);

    const data = faker.helpers.multiple(() => this.getDummyItem(), { count: countToGenerate });
    return {
      data,
      limit: params.limit,
      offset: params.offset,
      total: this.TOTAL_ITEMS,
    };
  }

  getDummyItem(): DummyDataDto {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthday: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }
}
