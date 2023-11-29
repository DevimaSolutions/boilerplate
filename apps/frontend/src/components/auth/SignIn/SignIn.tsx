'use client';

import Image from 'next/image';

import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit, onGoogleSignIn } = useSignIn();
  return (
    <main className="h-full flex  flex-col justify-center">
      <div className="flex  flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <SignInForm onSubmit={onSubmit} />
          <br />
          <button
            className="flex w-full justify-center btn btn-neutral"
            onClick={onGoogleSignIn}
            type="button"
          >
            <Image alt="Google icon" height={24} src="google-icon.svg" width={24} />
            Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
}
