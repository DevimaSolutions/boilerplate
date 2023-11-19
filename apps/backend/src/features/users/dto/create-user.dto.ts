import { ApiProperty } from '@nestjs/swagger';

import { UserRoleValues } from 'src/features/auth/enums';

export class CreateUserDto {
  email: string;
  password: string;
  role?: UserRoleValues;
  // TODO: check file uploads
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  image?: Express.Multer.File;
}
