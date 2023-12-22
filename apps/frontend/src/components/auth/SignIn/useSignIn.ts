import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';

import { envUtil } from 'src/utils';
import { checkRecaptchaToken } from 'src/utils/auth/check-recaptcha-token';

import { signInErrorMessagesMap } from './constants';

import type { SignInFormValues } from '../SignInForm';
import type { FormikHelpers } from 'formik';

export const useSignIn = () => {
  const searchParams = useSearchParams();
  const signInError = searchParams.get('error');
  const redirectUri = searchParams.get('redirectUri');
  const router = useRouter();

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const handleReCaptchaVerify = useCallback(async () => {
    window.grecaptcha.ready(async function () {
      const token = await window.grecaptcha
        .execute(recaptchaSiteKey, { action: 'submit' })
        .then(function (token) {
          return token;
        });
      const score = await checkRecaptchaToken(token);
      return score;
      //TODO: check score
    });
  }, [recaptchaSiteKey]);

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
    await handleReCaptchaVerify();
    // Call NextAuth api route
    /* const response = await signIn('credentials', {
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
    router.refresh();*/
  };

  const onGoogleSignIn = async () => {
    await signIn('google');
  };

  const onOutlookSignIn = async () => {
    await signIn('azure-ad', undefined, { prompt: 'login' });
  };

  return { onSubmit, onGoogleSignIn, onOutlookSignIn };
};
