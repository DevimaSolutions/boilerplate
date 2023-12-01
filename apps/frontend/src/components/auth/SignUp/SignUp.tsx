'use client';

import Link from 'next/link';

import { SignUpForm } from '../SignUpForm';

import { useSignUp } from './useSignUp';

export function SignUp() {
  const { onSubmit } = useSignUp();
  return (
    <main className="h-full flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-12 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up
      </h2>
      <SignUpForm onSubmit={onSubmit} />
      <p className="flex w-full justify-center gap-2">
        Already have an account?
        <Link className="link-primary" href="/sign-in">
          Sign in
        </Link>
      </p>
    </main>
  );
}
