import type { FormikHelpers } from 'formik';

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues, helpers: FormikHelpers<SignUpFormValues>) => Promise<void>;
}
