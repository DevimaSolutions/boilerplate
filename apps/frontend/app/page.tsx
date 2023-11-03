import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { SignOutButton } from '../src/components/auth/SignOutButton';
import { Example } from '../src/components/Example';

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <main>
      <h1>Boilerplate - Home page</h1>
      {session ? (
        <>
          <Link href="/profile">Profile</Link>
          <br />
          <SignOutButton />{' '}
        </>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
      <div>
        User:
        {JSON.stringify(session, null, 2)}
        <code />
      </div>
      <Example />
    </main>
  );
}
