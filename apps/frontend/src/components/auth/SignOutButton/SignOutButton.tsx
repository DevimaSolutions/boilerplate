'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  const router = useRouter();

  const onSignOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <button onClick={onSignOut} type="button">
      Sign out
    </button>
  );
}
