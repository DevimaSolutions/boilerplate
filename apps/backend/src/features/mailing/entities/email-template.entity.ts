import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { AuditEntity } from 'src/features/common/entities/audit.entity';

@Entity({ name: 'email_templates' })
export class EmailTemplate extends AuditEntity {
  constructor(partial: Partial<EmailTemplate>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Column()
  type: number;

  @ApiProperty()
  @Column()
  templateId: number;
}
