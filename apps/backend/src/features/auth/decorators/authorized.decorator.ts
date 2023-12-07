import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ErrorDto } from 'src/features/common/dto/error.dto';

import { UserRole } from '../enums';
import { CookieAuthGuard, RolesGuard } from '../guards';

import { Roles } from './roles.decorator';

/**
 * Protect endpoint using bearer JWT auth.
 * @param roles - list of roles that are allowed to execute on decorated action. Leave empty to allow access for any role
 */
export const Authorized = (...roles: UserRole[]) => {
  const decorators = [
    UseGuards(CookieAuthGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ type: () => ErrorDto }),
  ];

  if (roles.length) {
    decorators.push(UseGuards(RolesGuard), Roles(...roles));
  }

  return applyDecorators(...decorators);
};
