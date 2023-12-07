import { z } from 'zod';

import { emailSchema } from 'src/validation-schemas/email.schema';
import { passwordSchema } from 'src/validation-schemas/password.schema';

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
