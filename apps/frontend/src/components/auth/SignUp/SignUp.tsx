'use client';

import { SignUpForm } from '../SignUpForm';

import { useSignUp } from './useSignUp';

export function SignUp() {
  const { onSubmit } = useSignUp();
  return (
    <main>
      <h1>Sign Up</h1>
      <SignUpForm onSubmit={onSubmit} />
    </main>
  );
}
