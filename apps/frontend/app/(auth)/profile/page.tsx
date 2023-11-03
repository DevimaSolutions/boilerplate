import { RedirectType, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Example } from '../../../src/components/Example';

export default async function ProfilePage() {
  // TODO: use NextAuth App Router guide for caching
  const session = await getServerSession();
  if (!session) {
    redirect('/sign-in', RedirectType.replace);
  }

  return (
    <main>
      <h1>Boilerplate - Profile</h1>
      <div>
        User:
        {JSON.stringify(session, null, 2)}
        <code />
      </div>
      <Example />
    </main>
  );
}
