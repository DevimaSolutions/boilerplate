import { authorizationApi } from 'api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import type { SignUpFormValues } from '../SignUpForm';
import type { FormikHelpers } from 'formik';

export const useSignUp = () => {
  const router = useRouter();

  const onSubmit = async (
    values: SignUpFormValues,
    { setErrors }: FormikHelpers<SignUpFormValues>,
  ) => {
    try {
      await authorizationApi.signUp({ ...values });
      router.replace(`/verify-email?email=${values.email}`);
    } catch (err) {
      setErrors({
        email: '',
        password: '',
      });
      //TODO: add handling error after api-client fix
      toast.error('Something went wrong');
    }
  };
  return { onSubmit };
};
