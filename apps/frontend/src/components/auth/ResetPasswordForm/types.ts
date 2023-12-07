import type { FormikHelpers } from 'formik';

export interface ResetPasswordFormValues {
  password: string;
}

export interface ResetPasswordFormProps {
  onSubmit: (
    values: ResetPasswordFormValues,
    helpers: FormikHelpers<ResetPasswordFormValues>,
  ) => Promise<void>;
}
