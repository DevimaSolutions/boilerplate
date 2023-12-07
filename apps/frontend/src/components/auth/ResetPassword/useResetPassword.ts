import { authorizationApi } from 'api-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { resetPasswordErrorMessagesMap } from './constants';

import type { ResetPasswordFormValues } from '../ResetPasswordForm';

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

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      return;
    }

    const response = await authorizationApi.resetPassword({ password: values.password, token });

    if (response.error) {
      toast.error(response.error.message);
      return;
    }

    toast.success('Password has been changed successfully!');
    router.replace('/sign-in');
  };

  return { onSubmit };
};
