import { z } from 'zod';

export const uriSchema = z.string().trim().min(1).url().max(1000);
