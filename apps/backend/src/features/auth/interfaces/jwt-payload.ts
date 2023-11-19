import { UserRoleValues } from '../enums';

export interface JwtPayload {
  email: string;
  sub: string;
  role: UserRoleValues;
}

export type IJwtSub = Pick<JwtPayload, 'sub'>;
