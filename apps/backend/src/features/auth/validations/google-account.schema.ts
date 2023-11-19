import { z } from 'zod';

export const googleAccountSchema = z.object({
  googleAccountId: z.string().trim().toLowerCase().min(1).max(255),
  email: z.string().trim().toLowerCase().email().min(1).max(255),
  imageUri: z.string().trim().min(1).url().max(1000),
});
