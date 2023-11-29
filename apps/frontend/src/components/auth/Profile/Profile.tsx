'use client';

import { RedirectType, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export async function Profile() {
  // TODO: use NextAuth App Router guide for caching
  const session = await getServerSession();
  if (!session) {
    redirect('/sign-in', RedirectType.replace);
  }

  return (
    <main className="h-full flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-12 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Profile:
      </h2>
      <p>{JSON.stringify(session, null, 2)}</p>
    </main>
  );
}
