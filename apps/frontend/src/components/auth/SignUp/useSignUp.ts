import { authorizationApi } from 'api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import type { SignUpFormValues } from '../SignUpForm';

export const useSignUp = () => {
  const router = useRouter();

  const onSubmit = async (values: SignUpFormValues) => {
    const response = await authorizationApi.signUp({ ...values });

    if (response.ok) {
      router.replace(`/verify-email?email=${values.email}`);
    } else {
      toast.error(response.error ? (response.error as Error).message : 'Something went wrong');
    }
  };
  return { onSubmit };
};
