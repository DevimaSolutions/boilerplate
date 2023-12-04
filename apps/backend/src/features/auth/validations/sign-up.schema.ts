import { z } from 'zod';

import { emailSchema, passwordSchema } from 'src/features/common/validations';

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
