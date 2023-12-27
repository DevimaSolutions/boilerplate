import { z } from 'zod';

import { emailSchema } from 'src/features/common/validations';

export const azureAdAccountSchema = z.object({
  accountId: z.string().trim().min(1).max(255),
  email: emailSchema,
});
