import { authorizationApi } from 'api-client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { resetPasswordErrorMessagesMap } from './constants';

import type { ForgotPasswordFormValues } from '../ForgotPasswordForm';
import type { FormikHelpers } from 'formik';

export const useForgotPassword = () => {
  const searchParams = useSearchParams();
  const resetError = searchParams.get('error');

  useEffect(() => {
    if (resetError) {
      const message = resetPasswordErrorMessagesMap[resetError];
      toast.error(message || resetError, { toastId: 'resetError' });
    }
  }, [resetError]);

  const onSubmit = async (
    values: ForgotPasswordFormValues,
    { setErrors }: FormikHelpers<ForgotPasswordFormValues>,
  ) => {
    const response = await authorizationApi.forgotPassword(values);
    toast.info(`Check your inbox, we sent you a reset password e-mail at ${values.email}`);

    if (!response.ok) {
      setErrors({
        email:
          'We couldn`t find an account matching the email you entered. Please check your email and try again',
      });
    }
  };

  return { onSubmit };
};
