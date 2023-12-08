import { headers } from 'next/headers';

import { Profile } from 'src/components/auth/Profile';
import { requireAuthorizedUser } from 'src/utils/auth.util';

export default async function ProfilePage() {
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  // TODO: use NextAuth App Router guide for caching
  await requireAuthorizedUser({ currentRoute: pathname ?? '' });

  return <Profile />;
}
