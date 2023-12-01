import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
