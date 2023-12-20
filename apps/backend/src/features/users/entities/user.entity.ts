import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { UserRole, UserStatus } from 'src/features/auth/enums';
import { AuditEntity } from 'src/features/common/entities/audit.entity';

@Entity({ name: 'users' })
export class User extends AuditEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @ApiProperty()
  @Column({ nullable: true })
  googleAccountId?: string;

  @ApiProperty()
  @Column({ nullable: true })
  azureAdAccountId?: string;

  @ApiProperty({ type: 'UserRole' })
  @Column({ type: 'enum', enum: Object.values(UserRole), default: UserRole.User })
  role: UserRole;

  @ApiProperty({ type: 'UserStatus' })
  @Column({ type: 'enum', enum: Object.values(UserStatus), default: UserStatus.Active })
  status: UserStatus;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  imageUri: string | null;
}
