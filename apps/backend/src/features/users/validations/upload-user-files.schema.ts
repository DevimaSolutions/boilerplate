import { z } from 'zod';

import { imageSchema } from 'src/features/common/validations';

export const uploadUserFilesSchema = z.object({
  thumbnail: imageSchema,
  images: imageSchema.array().max(5).optional(),
  someField: z.string().min(3).max(10),
  anyNumber: z.coerce.number().int().positive(),
  flag: z.coerce.boolean().optional(),
});
