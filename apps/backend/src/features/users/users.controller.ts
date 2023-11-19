import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { Authorized, UserRole } from '../auth';
import { RequestWithUser } from '../auth/interfaces';
import { ZodValidationPipe } from '../common/pipes';

import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { updateUserSchema } from './validations';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @Authorized(UserRole.Admin)
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param() id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/profile')
  @Authorized(UserRole.User)
  update(
    @Req() req: RequestWithUser,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    // TODO: add this user to cookie that expire in 1 min
    // probably move this to authorization controller
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
