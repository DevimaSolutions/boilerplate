import { z } from 'zod';

import { emailSchema } from 'src/validation-schemas/email.schema';

export const changeEmailSchema = z.object({
  email: emailSchema,
});
