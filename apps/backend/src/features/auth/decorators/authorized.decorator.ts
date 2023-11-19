import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserRole } from '../enums';
import { CookieAuthGuard, RolesGuard } from '../guards';

import { Roles } from './roles.decorator';

/**
 * Protect endpoint using bearer JWT auth.
 * @param roles - list of roles that are allowed to execute on decorated action. Leave empty to allow access for any role
 */
export const Authorized = (...roles: UserRole[]) => {
  const decorators = [UseGuards(CookieAuthGuard), ApiBearerAuth()];

  if (roles.length) {
    decorators.push(UseGuards(RolesGuard), Roles(...roles));
  }

  return applyDecorators(...decorators);
};
