import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../services';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private authService: AuthService) {
    super(
      { header: 'api-key', prefix: '' },
      true,
      (apiKey: string, done: (...params: unknown[]) => void) => {
        const isValidApiKey = this.authService.validateApiKey(apiKey);

        if (isValidApiKey) {
          done(null, true);
        }

        done(new UnauthorizedException(), null);
      },
    );
  }
}
