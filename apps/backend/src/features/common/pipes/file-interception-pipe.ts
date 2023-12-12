import { ArgumentMetadata, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { getDtoFileFieldsMetadata } from 'src/utils/file-upload';

// this pipe automatically adds file interceptions to endpoints where Multer.File
// is found in the DTO
@Injectable({ scope: Scope.TRANSIENT })
export class FileInterceptionPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private request: Request) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' || typeof value !== 'object') {
      // Files can only be found in a request body
      return value;
    }

    if (!metadata.metatype) {
      // DTO is not a class
      // Cannot continue processing
      return value;
    }

    const fieldMetadata = getDtoFileFieldsMetadata(metadata.metatype);
    if (!fieldMetadata.length) {
      return value;
    }
    if ('files' in this.request && this.request.files) {
      const files = this.request.files as Record<string, Express.Multer.File[] | undefined>;
      return {
        ...value,
        ...Object.fromEntries(
          fieldMetadata.map(({ name, maxCount }) => {
            const fileOrArray = files[name];
            return [
              name,
              // unwrap from array files that are single
              maxCount === 1 && fileOrArray ? fileOrArray[0] : fileOrArray,
            ];
          }),
        ),
      };
    }

    return value;
  }
}
