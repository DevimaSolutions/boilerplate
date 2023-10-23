import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../../auth/enums';
import { ValueOf } from '../../common/types';

export class CreateUserDto {
  email: string;
  password: string;
  role?: ValueOf<UserRole>;
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  image?: Express.Multer.File;
}
