'use client';

import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import PasswordInput from 'src/components/inputs/PasswordInput';
import TextInput from 'src/components/inputs/TextInput';

import { signInSchema } from './schema';

import type { SignInFormProps } from './types';

const initialValues = {
  email: '',
  password: '',
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(signInSchema)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <Field
            component={TextInput}
            label="Email address"
            name="email"
            placeholder="email"
            type="email"
          />
          <Field
            component={PasswordInput}
            label="Password"
            name="password"
            placeholder="password"
          />
          <Link className="link link-primary" href="/forgot-password">
            Forgot password?
          </Link>
          <button
            className="flex w-full justify-center btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
}
