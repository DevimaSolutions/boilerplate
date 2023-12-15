import type { FormikHelpers } from 'formik';

export interface ChangeEmailFormValues {
  email: string;
}

export interface ChangeEmailFormProps {
  email: string;
  onSubmit: (
    values: ChangeEmailFormValues,
    helpers: FormikHelpers<ChangeEmailFormValues>,
  ) => Promise<void>;
}
