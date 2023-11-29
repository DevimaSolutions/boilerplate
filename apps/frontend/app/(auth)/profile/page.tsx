import { RedirectType, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Profile } from 'src/components/auth/Profile';

export default async function ProfilePage() {
  // TODO: use NextAuth App Router guide for caching
  const session = await getServerSession();
  if (!session) {
    redirect('/sign-in', RedirectType.replace);
  }
  return <Profile />;
}
