import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Authorized, UserRole } from '../auth';
import { RequestWithUser } from '../auth/interfaces';
import { IncludeFileUpload } from '../common/decorators/include-file-upload.decorator';
import { SuccessDto } from '../common/dto';
import { ErrorDto } from '../common/dto/error.dto';
import { ValidationErrorDto } from '../common/dto/validation-error.dto';
import { ZodValidationPipe } from '../common/pipes';

import { UpdateUserDto } from './dto';
import { UploadUserFiles } from './dto/upload-user-files.dto';
import { UsersService } from './users.service';
import { updateUserSchema } from './validations';
import { uploadUserFilesSchema } from './validations/upload-user-files.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiNotFoundResponse({ type: () => ErrorDto })
  @ApiForbiddenResponse({ type: () => ErrorDto })
  @ApiParam({ name: 'id', type: 'string' })
  @Authorized(UserRole.Admin)
  @Get(':id')
  findOne(@Param() id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @IncludeFileUpload(UpdateUserDto)
  @Authorized()
  @Patch('/profile')
  update(
    @Req() req: RequestWithUser,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // This endpoint is for showcase purposes only
  // It demonstrates how file upload functionality works
  // using @IncludeFileUpload(UploadUserFiles) decorator
  // Remove this endpoint if it is not used in real project
  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @IncludeFileUpload(UploadUserFiles)
  @Authorized()
  @Patch('/gallery')
  updateMultipleFile(
    @Body(new ZodValidationPipe(uploadUserFilesSchema)) uploadUserFilesDto: UploadUserFiles,
  ) {
    console.log(uploadUserFilesDto);
    return new SuccessDto();
  }
}
