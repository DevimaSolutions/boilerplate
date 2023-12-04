import { z } from 'zod';

import { emailSchema } from 'src/features/common/validations';

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
