import Link from 'next/link';

import { SignOutButton } from 'src/components/auth/SignOutButton';
import { Example } from 'src/components/Example';
import { getServerUser } from 'src/utils/auth/get-server-user';

export default async function HomePage() {
  const user = await getServerUser();

  return (
    <main>
      <h1>Boilerplate - Home page</h1>
      {user ? (
        <>
          <Link href="/profile">Profile</Link>
          <br />
          <SignOutButton />{' '}
        </>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
      <div>
        User {user?.role === 'admin' && '(ADMIN)'}:
        <br />
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
      <Example />
    </main>
  );
}
