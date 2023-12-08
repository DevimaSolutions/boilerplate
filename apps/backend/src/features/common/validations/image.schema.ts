import { fileConstants } from 'src/constants';
import { singleImageUploadLimits } from 'src/constants/files';

import { fileSchema } from './file.schema';

export const imageSchema = fileSchema
  .refine((file) => file.size <= singleImageUploadLimits.fileSize, `Max file size is 5MB.`)
  .refine(
    (file) => fileConstants.imageMimeTypes.includes(file.mimetype),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );
