import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity as OrmBaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity extends OrmBaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
