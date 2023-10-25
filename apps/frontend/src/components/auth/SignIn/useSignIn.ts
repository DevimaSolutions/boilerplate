import type { SignInFormValues } from '../SignInForm';

export const useSignIn = () => {
  const onSubmit = (values: SignInFormValues) => {
    console.log({ values });
    return Promise.resolve();

    // try {
    //   await authManager.signIn(values);
    // } catch (error: unknown) {
    //   if (isAxiosError(error)) {
    //     const data = error.response?.data as
    //       | Partial<FormErrorResponse<SignInFormValues>>
    //       | undefined;
    //     setErrors({
    //       email: ' ',
    //       password: data?.message,
    //       ...data?.errors,
    //     });
    //     return;
    //   }
    //   if (error instanceof Error) {
    //     setErrors({
    //       password: error.message,
    //     });
    //   }
    //   console.error(error);
    // }
  };
  return { onSubmit };
};
