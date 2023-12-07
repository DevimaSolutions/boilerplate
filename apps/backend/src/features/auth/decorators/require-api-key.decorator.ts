import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ErrorDto } from 'src/features/common/dto/error.dto';

import { ApiKeyAuthGuard } from '../guards';

/**
 * Protect endpoint using x-api-key header.
 */
export const RequireApiKey = () => {
  const decorators = [
    UseGuards(ApiKeyAuthGuard),
    ApiSecurity('x-api-key', ['x-api-key']),
    ApiUnauthorizedResponse({ type: () => ErrorDto }),
  ];

  return applyDecorators(...decorators);
};
