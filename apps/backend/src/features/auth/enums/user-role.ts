import { ValueOf } from 'src/features/common/types';

export const UserRole = {
  User: 0,
  Admin: 1,
} as const;

export type UserRole = typeof UserRole;
export type UserRoleValues = ValueOf<UserRole>;
