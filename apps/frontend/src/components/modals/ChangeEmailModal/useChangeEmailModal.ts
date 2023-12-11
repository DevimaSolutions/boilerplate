// import type { FormikHelpers } from 'formik';
// import type { ChangeEmailFormValues } from 'src/components/forms/ChangeEmailForm/types';

export const useChangeEmailModal = () => {
  const onSubmit = async () =>
    // values: ChangeEmailFormValues,
    // { setErrors }: FormikHelpers<ChangeEmailFormValues>,
    {
      // Call NextAuth api route
      // TODO: add patch request
      // const response = await signIn({
      //   ...values,
      // });
      // if (!response?.ok) {
      //   setErrors({
      //     email: ' ',
      //   });
      // }
    };
  return { onSubmit };
};
