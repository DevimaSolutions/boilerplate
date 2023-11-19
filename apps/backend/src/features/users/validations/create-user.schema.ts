import { z } from 'zod';

import { fileConstants } from 'src/constants';
import { UserRole } from 'src/features/auth';

// TODO: move some basic schemas to common folder
const multerFileStringFields = ['fieldname', 'originalname', 'encoding', 'mimetype'] as const;
const fileSchema = z.custom<Express.Multer.File>((file) => {
  const castedFile = file as Express.Multer.File | undefined;

  const hasStringFields = multerFileStringFields.every(
    (field) => typeof castedFile?.[field] === 'string',
  );
  return hasStringFields && typeof castedFile?.size === 'number';
});

export const createUserSchema = z.object({
  email: z.string().trim().toLowerCase().email().min(1).max(255),
  password: z.string().trim().min(8).max(255),
  role: z.nativeEnum(UserRole).optional().default(UserRole.User),
  image: fileSchema
    .refine((file) => file.size <= fileConstants.fileSize, `Max file size is 5MB.`)
    .refine(
      (file) => fileConstants.imageMimeTypes.includes(file.mimetype),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    )
    .optional(),
});
