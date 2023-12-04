import { authorizationApi } from 'api-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { resetPasswordErrorMessagesMap } from './constants';

import type { ResetPasswordFormValues } from '../ResetPasswordForm';
import type { FormikHelpers } from 'formik';

export const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetError = searchParams.get('error');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token?.length) {
      router.replace('/sign-in');
      return;
    }
    if (resetError) {
      const message = resetPasswordErrorMessagesMap[resetError];
      toast.error(message || resetError, { toastId: 'resetError' });
    }
  }, [resetError, router, token?.length]);

  const onSubmit = async (
    values: ResetPasswordFormValues,
    { setErrors }: FormikHelpers<ResetPasswordFormValues>,
  ) => {
    try {
      if (token) {
        await authorizationApi.resetPassword({ password: values.password, token });
        toast.success('Password has been changed successfully!');
        router.replace('/sign-in');
      }
    } catch (err) {
      //TODO: add handling error after api-client fix
      setErrors({
        password: '',
        confirmPassword: 'Something went wrong',
      });
    }
  };

  return { onSubmit };
};
