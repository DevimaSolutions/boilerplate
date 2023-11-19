import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { signInErrorMessagesMap } from './constants';

import type { SignInFormValues } from '../SignInForm';
import type { FormikHelpers } from 'formik';

export const useSignIn = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const signInError = searchParams.get('error');

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
    // Call NextAuth api route
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    if (!response?.ok) {
      setErrors({
        email: ' ',
        password:
          'We couldn`t find an account matching the username and password you entered. Please check your username and password and try again',
      });
    }
    // TODO: get redirect url from query
    router.refresh();
  };

  const onGoogleSignIn = async () => {
    await signIn('google');
  };

  return { onSubmit, onGoogleSignIn };
};
