import { Field, Form, Formik } from 'formik';

import type { SignUpFormProps } from './types';

const initialValues = {
  email: '',
  password: '',
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field name="email" placeholder="email" type="email" />
          <Field name="password" placeholder="password" type="password" />
          <button disabled={isSubmitting} type="submit">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}
