import { z } from 'zod';

import { imageSchema } from 'src/validation-schemas/image.schema';

export const updateFilesSchema = z.object({
  someField: z.string().trim().min(3),
  anyNumber: z.number().int().positive(),
  flag: z.boolean(),
  thumbnail: imageSchema,
  images: imageSchema.array().max(5).optional(),
});
