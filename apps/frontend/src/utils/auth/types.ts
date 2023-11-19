import type { UserRoleValues, UserStatusValues } from './enums';

export interface User {
  email: string;
  isEmailVerified: boolean;
  googleAccountId?: string;
  role: UserRoleValues;
  status: UserStatusValues;
  imageUri: string | null;
}

export interface GetServerUserParams {
  /**
   * Set to `true` to force fetching user object from the backend
   * rather than reading from cache
   */
  noCache?: boolean;
}
