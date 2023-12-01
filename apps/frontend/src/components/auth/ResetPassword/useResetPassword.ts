import { RedirectType, redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { resetPasswordErrorMessagesMap } from './constants';

import type { ResetPasswordFormValues } from '../ResetPasswordForm';
import type { FormikHelpers } from 'formik';

export const useResetPassword = () => {
  const searchParams = useSearchParams();
  const resetError = searchParams.get('error');
  const token = searchParams.get('token');

  useEffect(() => {
    if (resetError) {
      const message = resetPasswordErrorMessagesMap[resetError];
      toast.error(message || resetError, { toastId: 'resetError' });
    }
  }, [resetError]);

  const onSubmit = async (
    values: ResetPasswordFormValues,
    { setErrors }: FormikHelpers<ResetPasswordFormValues>,
  ) => {
    if (!token?.length) {
      redirect('/sign-in', RedirectType.replace);
    }
    const response = await fetch(`api/authorization/reset-password`, {
      method: 'PUT',
      body: JSON.stringify({ password: values.password, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      setErrors({
        password: '',
        confirmPassword: 'Something went wrong',
      });
    }
    redirect('/sign-in', RedirectType.replace);
  };

  return { onSubmit };
};
