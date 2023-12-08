'use client';

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';

import type { ButtonHTMLAttributes } from 'react';

export function SignOutButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const onSignOut = async () => {
    await signOut();
  };

  return (
    <button
      className={clsx('bg-white text-black hover:bg-slate-100 border-none', className)}
      onClick={onSignOut}
      type="button"
      {...props}
    >
      <ArrowRightOnRectangleIcon className="w-4 h-4" />
      Sign out
    </button>
  );
}
