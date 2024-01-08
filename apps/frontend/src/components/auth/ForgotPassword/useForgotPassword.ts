import { authorizationApi } from 'api-client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { verifyRecaptcha } from 'src/utils/recaptcha/verify-recaptcha';

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
    const { hasValidRecaptchaScore } = await verifyRecaptcha('forgotPassword');
    if (!hasValidRecaptchaScore) {
      setErrors({
        email: 'Sorry, Google Recaptcha has detected you as a bot',
      });
      return;
    }

    const response = await authorizationApi.forgotPassword(values);

    if (response.error) {
      toast.error(response.error.message);
      return;
    }

    toast.info(`Check your inbox, we sent you a reset password e-mail at ${values.email}`);
  };

  return { onSubmit };
};
