'use client';

import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit } = useSignIn();
  return (
    <main>
      <h1>Sign In</h1>
      <SignInForm onSubmit={onSubmit} />
    </main>
  );
}
