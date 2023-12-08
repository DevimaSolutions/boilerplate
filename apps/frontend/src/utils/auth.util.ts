import { headers } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from './auth';
import { getServerUser } from './auth/get-server-user';

import type { UserRole } from './auth/enums';
import type { User } from 'next-auth';

export async function requireAuthorizedUser(options?: {
  allowedRoles?: UserRole[];
}): Promise<User> {
  const user = await getServerUser();

  if (!user) {
    const headersList = headers();
    const pathname = headersList.get('x-pathname');
    redirect(
      `/sign-in${pathname && `?redirectUri=${encodeURIComponent(pathname)}`}`,
      RedirectType.replace,
    );
  }

  if (options?.allowedRoles?.length && !options.allowedRoles.includes(user.role as UserRole)) {
    redirect('/', RedirectType.replace);
  }

  return user;
}

export async function requireUnauthorizedUser(): Promise<void> {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/', RedirectType.replace);
  }
}
