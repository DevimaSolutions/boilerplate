import { z } from 'zod';

import { emailSchema } from 'src/validation-schemas/email.schema';

export const signInSchema = z.object({
  email: emailSchema,
});
