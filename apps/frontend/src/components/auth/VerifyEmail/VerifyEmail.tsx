'use client';

import { EnvelopeIcon } from '@heroicons/react/24/solid';

import type { VerifyEmailProps } from './types';

export function VerifyEmail({ email }: VerifyEmailProps) {
  return (
    <>
      <div className="h-[85px] w-[85px] rounded-full flex justify-center items-center self-center bg-accent">
        <EnvelopeIcon className="h-14 w-14 text-success" />
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Please verify your email
      </h2>
      <p className="w-full text-center">
        You&apos;re almost there! We sent an email to <br />
        <b>{email}</b>
      </p>
      <p className="w-full text-center">
        Just click on the link in the email to complete your sign up. If you don&apos;t see it, you
        may need to <b>check your spam</b> folder.
      </p>
    </>
  );
}
