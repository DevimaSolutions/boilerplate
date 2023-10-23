import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'admin@devima.solutions' })
  email: string;
  @ApiProperty({ example: 'Test1234' })
  password: string;
}
