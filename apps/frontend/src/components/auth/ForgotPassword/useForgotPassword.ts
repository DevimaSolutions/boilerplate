import { authorizationApi } from 'api-client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { resetPasswordErrorMessagesMap } from './constants';

import type { ForgotPasswordFormValues } from '../ForgotPasswordForm';

export const useForgotPassword = () => {
  const searchParams = useSearchParams();
  const resetError = searchParams.get('error');

  useEffect(() => {
    if (resetError) {
      const message = resetPasswordErrorMessagesMap[resetError];
      toast.error(message || resetError, { toastId: 'resetError' });
    }
  }, [resetError]);

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const response = await authorizationApi.forgotPassword(values);

    if (response.ok) {
      toast.info(`Check your inbox, we sent you a reset password e-mail at ${values.email}`);
    } else {
      toast.error((response.error as Error).message);
    }
  };

  return { onSubmit };
};
