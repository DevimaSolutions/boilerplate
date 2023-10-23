import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../common/repository';

import { EmailTemplate } from './entities';

@Injectable()
export class EmailTemplatesRepository extends BaseRepository<EmailTemplate> {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {
    super(EmailTemplate, dataSource);
  }
}
