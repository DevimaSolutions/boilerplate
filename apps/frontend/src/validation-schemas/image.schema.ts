import { z } from 'zod';

import fileConstants, { singleImageUploadLimits } from 'src/constants/file-limits';

export const imageSchema = z
  .any()
  .refine((files: File | undefined) => Boolean(files), 'Image is required.')
  .refine(
    (files: File | undefined) =>
      files?.size ? files.size <= singleImageUploadLimits.fileSize : false,
    `Max file size is 5MB.`,
  )
  .refine(
    (files: File | undefined) => fileConstants.imageMimeTypes.includes(files?.type ?? ''),
    '.jpg, .jpeg, .png, .gif and .webp files are accepted.',
  );
