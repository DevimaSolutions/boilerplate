import { getServerSession } from 'next-auth';

import { authOptions } from './next-auth-options';

import type { User } from 'api-client';

/**
 * Returns currently authorized user.
 * User is fetched from `/authorization/session/:id` endpoint by NextAuth.
 * If you want to modify data returned by this function update respective endpoint
 * @returns `User` if session is authorized, `null` otherwise
 */
export const getServerUser = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;

  return user as User | null;
};
