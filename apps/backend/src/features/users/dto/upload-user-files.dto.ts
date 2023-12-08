import { ApiProperty } from '@nestjs/swagger';

export class UploadUserFiles {
  someField: string;
  anyNumber: number;
  flag?: boolean;

  @ApiProperty({ type: 'string', format: 'binary' })
  thumbnail: Express.Multer.File;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images?: Express.Multer.File[];
}
