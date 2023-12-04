'use client';

import { EnvelopeIcon } from '@heroicons/react/24/solid';

import { useVerifyEmail } from './useVerifyEmail';

export function VerifyEmail() {
  const { email } = useVerifyEmail();
  return (
    <main className="h-full flex flex-col justify-center items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-12 ">
      <div className="h-[85px] w-[85px] rounded-full flex justify-center items-center bg-[#d4f8de]">
        <EnvelopeIcon className="h-14 w-14 text-[#319060]" />
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Please verify your email
      </h2>
      <p className="w-full text-center">
        You{`'`}re almost there! We sent an email to <br />
        <b>{email}</b>
      </p>
      <p className="w-full text-center">
        Just click on the link in the email to complete your sign up. If you don{`'`}t see it, you
        may need to <b>check your spam</b> folder.
      </p>
    </main>
  );
}
