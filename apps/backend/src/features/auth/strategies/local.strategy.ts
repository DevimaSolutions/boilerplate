import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { errorMessages } from 'src/constants';
import { User } from 'src/features/users/entities/user.entity';

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
      throw new UnauthorizedException(errorMessages.invalidCredentials);
    }

    return user;
  }
}
