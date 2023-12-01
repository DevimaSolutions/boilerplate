import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
