'use client';
import { ForgotPasswordForm } from '../ForgotPasswordForm';

import { useForgotPassword } from './useForgotPassword';

export function ForgotPassword() {
  const { onSubmit } = useForgotPassword();
  return (
    <>
      <h2 className="mt-10 mb-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset your password
      </h2>
      <p>
        Enter the email address you used to sign up and we’ll send you instructions to reset your
        password.
      </p>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </>
  );
}
