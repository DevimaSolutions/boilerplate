import { ValueOf } from '../../common/types';
import { UserRole } from '../enums';

export interface JwtPayload {
  email: string;
  sub: string;
  role: ValueOf<UserRole>;
}

export type IJwtSub = Pick<JwtPayload, 'sub'>;
