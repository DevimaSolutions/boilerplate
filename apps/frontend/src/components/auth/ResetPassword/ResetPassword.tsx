'use client';
import { ResetPasswordForm } from '../ResetPasswordForm';

import { useResetPassword } from './useResetPassword';

export function ResetPassword() {
  const { onSubmit } = useResetPassword();
  return (
    <main className="h-full flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-12 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset your password
      </h2>
      <ResetPasswordForm onSubmit={onSubmit} />
    </main>
  );
}
