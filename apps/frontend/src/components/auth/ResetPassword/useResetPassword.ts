import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { resetPasswordErrorMessagesMap } from './constants';

import type { ResetPasswordFormValues } from '../ResetPasswordForm';
import type { FormikHelpers } from 'formik';

export const useResetPassword = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const resetError = searchParams.get('error');

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
    //TODO: change function to reset
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    if (!response?.ok) {
      setErrors({
        password: '',
        confirmPassword: 'Something went wrong',
      });
    }
    // TODO: get redirect url from query
    router.refresh();
  };

  return { onSubmit };
};
