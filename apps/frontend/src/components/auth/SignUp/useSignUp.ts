import { useRouter } from 'next/navigation';

import type { SignUpFormValues } from '../SignUpForm';
import type { FormikHelpers } from 'formik';

export const useSignUp = () => {
  const router = useRouter();

  const onSubmit = async (
    values: SignUpFormValues,
    { setErrors }: FormikHelpers<SignUpFormValues>,
  ) => {
    // TODO: use react query
    const res = await fetch(`api/authorization/sign-up`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      const data = (await res.json()) as { message: string; errors: Record<string, string> };
      setErrors({
        email: ' ',
        password: data.message,
        ...data.errors,
      });
      return;
    }

    router.refresh();
  };
  return { onSubmit };
};
