import { z } from 'zod';

import fileConstants, { singleImageUploadLimits } from 'src/constants/file-limits';
import bytesParser from 'src/utils/bytes-parser.util';

// TODO: move to a separate file
export const fileSchema = z.custom<Blob>(
  (file) => {
    return file instanceof Blob;
  },
  { message: 'File is required.' },
);

export const imageSchema = fileSchema
  .refine(
    (file: Blob) => file.size <= singleImageUploadLimits.fileSize,
    `Max file size is ${bytesParser(singleImageUploadLimits.fileSize, 0)}.`,
  )
  .refine(
    (file: Blob) => fileConstants.imageMimeTypes.includes(file.type),
    '.jpg, .jpeg, .png, .gif and .webp files are accepted.',
  );
