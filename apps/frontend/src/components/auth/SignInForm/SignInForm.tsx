'use client';

import { Field, Form, Formik } from 'formik';

import type { SignInFormProps } from './types';

const initialValues = {
  email: '',
  password: '',
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field name="email" placeholder="email" type="email" />
          <Field name="password" placeholder="password" type="password" />
          <button disabled={isSubmitting} type="submit">
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
}
