import { applyDecorators, UseGuards } from '@nestjs/common';

import { UserRole } from '../enums';
import { ApiKeyAuthGuard } from '../guards';

import { Authorized } from './authorized.decorator';

/**
 * Protect endpoint using bearer JWT auth and api key.
 * @param roles - list of roles that are allowed to execute on decorated action. Leave empty to allow access for any role
 */
export const ApiKeyAuthorized = (...roles: UserRole[]) => {
  const decorators = [Authorized(...roles), UseGuards(ApiKeyAuthGuard)];

  return applyDecorators(...decorators);
};
