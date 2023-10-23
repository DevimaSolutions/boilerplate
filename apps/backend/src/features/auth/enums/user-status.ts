export const UserStatus = {
  Pending: 0,
  Active: 1,
  Blocked: 2,
} as const;

export type UserStatus = typeof UserStatus;
