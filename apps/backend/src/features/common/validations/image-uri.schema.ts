import { z } from 'zod';

export const imageUriSchema = z.string().trim().min(1).url().max(1000);
