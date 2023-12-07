import { z } from 'zod';

import { passwordSchema } from 'src/validation-schemas/password.schema';

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});
