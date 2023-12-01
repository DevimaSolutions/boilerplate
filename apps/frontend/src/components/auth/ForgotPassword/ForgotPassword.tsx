'use client';
import { ForgotPasswordForm } from '../ForgotPasswordForm';

import { useForgotPassword } from './useForgotPassword';

export function ForgotPassword() {
  const { onSubmit } = useForgotPassword();
  return (
    <main className="h-full flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-md px-6 py-12 ">
      <h2 className="mt-10 mb-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset your password
      </h2>
      <p>
        Enter the email address you used to sign up and we’ll send you instructions to reset your
        password.
      </p>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </main>
  );
}
