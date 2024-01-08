'use client';

import Image from 'next/image';
import Link from 'next/link';

import { RecaptchaLinks } from '../RecaptchaLinks';
import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit, onGoogleSignIn, onOutlookSignIn } = useSignIn();

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <SignInForm onSubmit={onSubmit} />
      <RecaptchaLinks />
      <button
        className="flex w-full justify-center btn btn-neutral mt-4"
        onClick={onGoogleSignIn}
        type="button"
      >
        <Image alt="Google icon" height={24} src="google-icon.svg" width={24} />
        Sign in with Google
      </button>
      <button
        className="flex w-full justify-center btn btn-neutral mt-4"
        onClick={onOutlookSignIn}
        type="button"
      >
        Sign in with Outlook
      </button>
      <p className="flex w-full justify-center gap-2">
        Don&apos;t have an account?{' '}
        <Link className="link-primary" href="/sign-up">
          Sign up
        </Link>
      </p>
    </>
  );
}
