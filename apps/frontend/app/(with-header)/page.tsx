import Link from 'next/link';

import { getServerUser } from 'src/utils/auth/get-server-user';

export default async function HomePage() {
  const user = await getServerUser();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-center mt-10">
        Boilerplate - Home page
        <br />
        {user ? `Welcome ${user.email}!` : 'Please sign in'}
      </h1>
      <Link className="flex w-[250px] self-center btn btn-primary" href="/dummy-data" type="button">
        Try to load dummy data
      </Link>
    </main>
  );
}
