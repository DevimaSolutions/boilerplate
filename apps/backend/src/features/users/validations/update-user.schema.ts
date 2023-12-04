import { z } from 'zod';

import { emailSchema } from 'src/features/common/validations';

export const updateUserSchema = z.object({
  email: emailSchema,
});
