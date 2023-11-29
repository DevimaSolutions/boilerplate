'use client';

import Image from 'next/image';

import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit, onGoogleSignIn } = useSignIn();
  return (
    <main className="h-full flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-12 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <SignInForm onSubmit={onSubmit} />
      <button
        className="flex w-full justify-center btn btn-neutral mt-4"
        onClick={onGoogleSignIn}
        type="button"
      >
        <Image alt="Google icon" height={24} src="google-icon.svg" width={24} />
        Sign in with Google
      </button>
    </main>
  );
}
