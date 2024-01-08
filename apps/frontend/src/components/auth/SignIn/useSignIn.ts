import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { verifyRecaptcha } from 'src/utils/recaptcha/verify-recaptcha';

import { signInErrorMessagesMap } from './constants';

import type { SignInFormValues } from '../SignInForm';
import type { FormikHelpers } from 'formik';

export const useSignIn = () => {
  const searchParams = useSearchParams();
  const signInError = searchParams.get('error');
  const redirectUri = searchParams.get('redirectUri');
  const router = useRouter();

  useEffect(() => {
    if (signInError) {
      const message = signInErrorMessagesMap[signInError];
      toast.error(message || signInError, { toastId: 'signInError' });
    }
  }, [signInError]);

  const onSubmit = async (
    values: SignInFormValues,
    { setErrors }: FormikHelpers<SignInFormValues>,
  ) => {
    const { hasValidRecaptchaScore } = await verifyRecaptcha('singIn');
    if (!hasValidRecaptchaScore) {
      setErrors({
        email: ' ',
        password: 'Sorry, Google Recaptcha has detected you as a bot',
      });
      return;
    }

    // Call NextAuth api route
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    if (!response?.ok) {
      setErrors({
        email: ' ',
        password:
          'We couldn`t find an account matching the email and password you entered. Please check your email and password and try again',
      });
      return;
    }
    router.replace(redirectUri ?? '/');
    router.refresh();
  };

  const onGoogleSignIn = async () => {
    await signIn('google');
  };

  const onOutlookSignIn = async () => {
    await signIn('azure-ad', undefined, { prompt: 'login' });
  };

  return { onSubmit, onGoogleSignIn, onOutlookSignIn };
};
