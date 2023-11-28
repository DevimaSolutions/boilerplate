import Link from 'next/link';

import { Example } from 'src/components/Example';
import { getServerUser } from 'src/utils/auth/get-server-user';

export default async function HomePage() {
  const user = await getServerUser();

  return (
    <main>
      <h1>Boilerplate - Home page</h1>
      {user ? null : <Link href="/sign-in">Sign In</Link>}
      <div>
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
      <Example />
    </main>
  );
}
