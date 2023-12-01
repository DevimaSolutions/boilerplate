import { z } from 'zod';

export const updateUserSchema = z.object({
  email: z.string().trim().toLowerCase().email().min(1).max(255).optional(),
});
