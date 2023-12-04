import { z } from 'zod';

export const emailSchema = z.string().trim().toLowerCase().email().min(1).max(255);
