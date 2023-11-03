import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import type { SignInFormValues } from '../SignInForm';
import type { FormikHelpers } from 'formik';

export const useSignIn = () => {
  const router = useRouter();

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
  return { onSubmit };
};
