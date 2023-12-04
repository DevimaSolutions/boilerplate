import { z } from 'zod';

import { UserRole } from 'src/features/auth';

export const userRoleSchema = z.nativeEnum(UserRole).optional().default(UserRole.User);
