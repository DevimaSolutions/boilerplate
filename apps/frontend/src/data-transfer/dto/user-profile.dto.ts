import type { UserRole, UserStatus } from 'src/utils/auth';

export interface UserProfileDto {
  email: string;
  isEmailVerified: boolean;
  password?: string;
  googleAccountId?: string;
  role: UserRole;
  status: UserStatus;
  imageUri: string | null;
}
