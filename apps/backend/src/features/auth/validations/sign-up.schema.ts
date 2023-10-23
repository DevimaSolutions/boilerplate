import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().trim().toLowerCase().email().min(1).max(255),
  password: z.string().trim().min(8).max(255),
});
