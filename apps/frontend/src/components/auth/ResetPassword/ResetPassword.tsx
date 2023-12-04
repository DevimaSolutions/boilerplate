'use client';
import { ResetPasswordForm } from '../ResetPasswordForm';

import { useResetPassword } from './useResetPassword';

export function ResetPassword() {
  const { onSubmit } = useResetPassword();
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset your password
      </h2>
      <ResetPasswordForm onSubmit={onSubmit} />
    </>
  );
}
