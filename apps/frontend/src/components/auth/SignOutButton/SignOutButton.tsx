'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  const onSignOut = async () => {
    await signOut();
  };

  return (
    <button className="btn btn-primary text-white border-none" onClick={onSignOut} type="button">
      Sign out
    </button>
  );
}
