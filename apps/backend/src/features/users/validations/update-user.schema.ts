import { z } from 'zod';

import { emailSchema, imageSchema } from 'src/features/common/validations';

export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  image: imageSchema.optional(),
});
