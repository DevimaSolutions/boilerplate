import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from 'src/features/auth/enums';

export class CreateUserDto {
  email: string;
  password: string;
  role?: UserRole;
  // TODO: check file uploads
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  image?: Express.Multer.File;
}
