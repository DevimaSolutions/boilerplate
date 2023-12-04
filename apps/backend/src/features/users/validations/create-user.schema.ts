import { z } from 'zod';

import {
  imageSchema,
  emailSchema,
  passwordSchema,
  userRoleSchema,
} from 'src/features/common/validations';

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: userRoleSchema,
  image: imageSchema,
});
