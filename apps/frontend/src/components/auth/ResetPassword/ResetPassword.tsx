'use client';
import { ResetPasswordForm } from '../ResetPasswordForm';

import { useResetPassword } from './useResetPassword';

export function ResetPassword() {
  const { onSubmit } = useResetPassword();
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-6 py-12 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset your password
      </h2>
      <ResetPasswordForm onSubmit={onSubmit} />
    </div>
  );
}
