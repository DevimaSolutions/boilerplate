'use client';

import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit, onGoogleSignIn } = useSignIn();
  return (
    <main>
      <h1>Sign In</h1>
      <SignInForm onSubmit={onSubmit} />
      <br />
      <button onClick={onGoogleSignIn} type="button">
        Sign in with Google
      </button>
    </main>
  );
}
