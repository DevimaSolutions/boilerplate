import { z } from 'zod';

import { emailSchema } from 'src/validation-schemas/email.schema';

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
