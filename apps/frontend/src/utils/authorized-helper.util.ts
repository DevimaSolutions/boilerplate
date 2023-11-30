import { RedirectType, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { getServerUser } from './auth/get-server-user';

import type { UserRole } from './auth/enums';
import type { Session } from 'next-auth';

export async function requireAuthorizedUser(options?: {
  allowedRoles?: UserRole[];
}): Promise<Session> {
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in', RedirectType.replace);
  }

  const user = await getServerUser();

  if (
    options?.allowedRoles?.length &&
    user &&
    !options.allowedRoles.includes(user.role as UserRole)
  ) {
    redirect('/', RedirectType.replace);
  }

  return session;
}

export async function requireUnauthorizedUser(): Promise<void> {
  const session = await getServerSession();
  if (session) {
    redirect('/', RedirectType.replace);
  }
}
