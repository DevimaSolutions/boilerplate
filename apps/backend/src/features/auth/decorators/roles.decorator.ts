import { SetMetadata } from '@nestjs/common';

import { ValueOf } from '../../common/types';
import { UserRole } from '../enums';

export const ROLES_KEY = 'roles';
/**
 * Allow access to resource only fro the roles passed to parameters
 * @param roles - list of roles that are allowed to execute decorated action
 */
export const Roles = (...roles: ValueOf<UserRole>[]) => SetMetadata(ROLES_KEY, roles);
