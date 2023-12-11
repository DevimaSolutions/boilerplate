import { z } from 'zod';

export const generalSettingsSchema = z.object({
  someField: z.string().trim().min(1),
  anyNumber: z.number(),
  flag: z.boolean(),
});
