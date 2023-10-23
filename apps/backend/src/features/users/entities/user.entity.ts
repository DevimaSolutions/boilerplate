import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { UserRole, UserStatus } from '../../auth/enums';
import { AuditEntity } from '../../common/entities';
import { ValueOf } from '../../common/types';

@Entity({ name: 'users' })
export class User extends AuditEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password?: string;

  @ApiProperty({ type: 'UserRole' })
  @Column({ type: 'enum', enum: Object.values(UserRole), default: UserRole.User })
  role: ValueOf<UserRole>;

  @ApiProperty({ type: 'UserStatus' })
  @Column({ type: 'enum', enum: Object.values(UserStatus), default: UserStatus.Active })
  status: ValueOf<UserStatus>;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  imageUri: string | null;
}
