import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ZodError } from 'zod';

import { singleImageUploadLimits } from 'src/constants/files';

import { Authorized, UserRole } from '../auth';
import { RequestWithUser } from '../auth/interfaces';
import { IncludeFileUpload } from '../common/decorators/include-file-upload.decorator';
import { SuccessDto } from '../common/dto';
import { ErrorDto } from '../common/dto/error.dto';
import { ValidationErrorDto } from '../common/dto/validation-error.dto';
import { ValidationBadRequestException } from '../common/exceptions';
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
  @Get(':id')
  @Authorized(UserRole.Admin)
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param() id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @ApiConsumes('multipart/form-data')
  @Patch('/profile')
  @Authorized()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: singleImageUploadLimits,
      fileFilter: (req, file, callback) => {
        updateUserSchema
          .parseAsync({ image: file })
          .then(() => {
            callback(null, true);
          })
          .catch((error) => {
            if (error instanceof ZodError) {
              callback(new ValidationBadRequestException(error, 'Validation failed'), false);
            }
            callback(error instanceof Error ? error : new Error(String(error)), false);
          });
      },
    }),
  )
  update(
    @Req() req: RequestWithUser,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    if (image) {
      updateUserDto.image = image;
    }
    // TODO: add this user to cookie that expire in 1 min
    // probably move this to authorization controller
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @Patch('/gallery')
  @Authorized()
  @IncludeFileUpload(UploadUserFiles)
  updateMultipleFile(
    @Body(new ZodValidationPipe(uploadUserFilesSchema)) uploadUserFilesDto: UploadUserFiles,
  ) {
    // TODO: create s3 file streaming
    // and use this endpoint to set files to "user gallery"
    console.log(uploadUserFilesDto);
    return new SuccessDto();
  }
}
