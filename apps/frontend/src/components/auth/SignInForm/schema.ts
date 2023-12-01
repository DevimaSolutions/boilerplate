import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email().min(1).max(255),
  password: z.string().min(8).max(255),
});
