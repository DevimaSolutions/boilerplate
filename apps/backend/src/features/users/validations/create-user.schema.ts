import { z } from 'zod';

import {
  imageSchema,
  emailSchema,
  passwordSchema,
  roleSchema,
} from 'src/features/common/validations';

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
  image: imageSchema,
});
