import { z } from 'zod';

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1),
  password: z.string().trim().min(8).max(255),
});
