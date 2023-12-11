import type { FormikHelpers } from 'formik';

export interface ChangeEmailFormValues {
  email: string;
}

export interface ChangeEmailFormProps {
  onSubmit: (
    values: ChangeEmailFormValues,
    helpers: FormikHelpers<ChangeEmailFormValues>,
  ) => Promise<void>;
}
