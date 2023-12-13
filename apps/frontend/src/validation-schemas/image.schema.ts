import fileConstants, { singleImageUploadLimits } from 'src/constants/file-limits';
import bytesParser from 'src/utils/bytes-parser.util';

import { fileSchema } from './file.schema';

export const imageSchema = fileSchema
  .refine(
    (file: File) => file.size <= singleImageUploadLimits.fileSize,
    `Max file size is ${bytesParser(singleImageUploadLimits.fileSize, 0)}.`,
  )
  .refine(
    (file: File) => fileConstants.imageMimeTypes.includes(file.type),
    '.jpg, .jpeg, .png, .gif and .webp files are accepted.',
  );
