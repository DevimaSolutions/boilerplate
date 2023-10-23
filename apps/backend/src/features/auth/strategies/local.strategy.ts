import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { errorMessages } from '../../../constants';
import { User } from '../../users';
import { AuthService } from '../services';

// This strategy is responsible for logging in user with email and password
@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email.toLowerCase(), password);
    if (!user) {
      // TODO: create error messages constants file
      throw new UnauthorizedException(errorMessages.invalidCredentials);
    }
    return user;
  }
}
