import { createUserSchema } from './create-user.schema';

export const updateUserSchema = createUserSchema.omit({ password: true });
