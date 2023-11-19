import type { ValueOf } from 'src/types';

export const UserRole = {
  User: 0,
  Admin: 1,
} as const;

export type UserRole = typeof UserRole;
export type UserRoleValues = ValueOf<UserRole>;

export const UserStatus = {
  Pending: 0,
  Active: 1,
  Blocked: 2,
} as const;

export type UserStatus = typeof UserStatus;
export type UserStatusValues = ValueOf<UserStatus>;
