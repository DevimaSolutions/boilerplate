import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';

import { authOptions } from './next-auth-options';

import type { GetServerUserParams, User } from './types';

const getCachedUser = () => {
  try {
    const cookieStore = cookies();
    const cachedUserCookie = cookieStore.get('user');
    if (!cachedUserCookie?.value) {
      return null;
    }

    const cachedUser = JSON.parse(cachedUserCookie.value) as User;
    return cachedUser;
  } catch {
    return null;
  }
};

/**
 * Returns currently authorized user.
 * User is fetched from `/authorization/session/:id` endpoint by NextAuth.
 * If you want to modify data returned by this function update respective endpoint
 * @returns `User` if session is authorized, `null` otherwise
 */
export const getServerUser = async (options?: GetServerUserParams) => {
  const cachedUser = options?.noCache ? null : getCachedUser();
  console.log({ cachedUser });
  if (cachedUser) {
    return cachedUser;
  }
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;
  return user as User | null;
};
