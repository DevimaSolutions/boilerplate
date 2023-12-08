import { Type, UseInterceptors, UsePipes, applyDecorators } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiConsumes } from '@nestjs/swagger';

import { getDtoFileFieldsMetadata } from 'src/utils/file-upload';

import { FileInterceptionPipe } from '../pipes/file-interception-pipe';

/**
 * Decorator enables file upload functionality for a given DTO.
 * Use it to automatically populate DTO with files from the request
 * (So you do not need use additional file interceptors and UploadedFile decorators).
 *
 * The body DTO should be passed as the first argument.
 *
 * @param bodyDto - The DTO class that contain some file fields.
 * @param localMulterOptions - The local multer options.
 * @returns The decorated method.
 */
export const IncludeFileUpload = <TDto>(
  bodyDto: Type<TDto>,
  localMulterOptions?: MulterOptions,
) => {
  const decorators = [
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileFieldsInterceptor(getDtoFileFieldsMetadata(bodyDto), localMulterOptions)),
    UsePipes(FileInterceptionPipe),
  ];

  return applyDecorators(...decorators);
};
