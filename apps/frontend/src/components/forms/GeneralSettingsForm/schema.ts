import { z } from 'zod';

import { fileConstants } from 'src/constants';

export const generalSettingsSchema = z.object({
  someField: z.string().trim().min(1),
  anyNumber: z.coerce.number().int().positive(),
  flag: z.coerce.boolean(),
  thumbnail: z
    .any()
    .refine(
      (files: FileList | undefined) => (files?.length ? files.length > 0 : false),
      'Thumbnail is required',
    )
    .refine(
      (files: FileList | undefined) =>
        files?.[0]?.size ? files[0].size < fileConstants.singleImageUploadLimits.fileSize : false,
      'Max file size is 5MB',
    ),
  images: z
    .any()
    .refine((files: FileList) => files.length > 0, 'Images are required')
    .refine(
      (files: FileList) => files[0].size < fileConstants.singleImageUploadLimits.fileSize,
      'Max file size is 5MB',
    ),
});
