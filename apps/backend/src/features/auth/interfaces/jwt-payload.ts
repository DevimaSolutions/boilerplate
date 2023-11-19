import { UserRole } from '../enums';

export interface JwtPayload {
  email: string;
  sub: string;
  role: UserRole;
}

export type IJwtSub = Pick<JwtPayload, 'sub'>;
