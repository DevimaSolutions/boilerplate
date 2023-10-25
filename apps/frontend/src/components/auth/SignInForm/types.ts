import type { FormikHelpers } from 'formik';

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInFormProps {
  onSubmit: (values: SignInFormValues, helpers: FormikHelpers<SignInFormValues>) => Promise<void>;
}
