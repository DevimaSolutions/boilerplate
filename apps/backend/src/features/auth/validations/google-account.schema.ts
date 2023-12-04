import { z } from 'zod';

import { emailSchema } from 'src/features/common/validations';
import { uriSchema } from 'src/features/common/validations/image-uri.schema';

export const googleAccountSchema = z.object({
  googleAccountId: z.string().trim().toLowerCase().min(1).max(255),
  email: emailSchema,
  imageUri: uriSchema,
});
