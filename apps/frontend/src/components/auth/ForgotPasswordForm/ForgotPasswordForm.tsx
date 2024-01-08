'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import TextInput from 'src/components/inputs/TextInput';

import { RecaptchaLinks } from '../RecaptchaLinks';

import { forgotPasswordSchema } from './schema';

import type { ForgotPasswordFormProps } from './types';

const initialValues = {
  email: '',
};

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(forgotPasswordSchema)}
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
          <button
            className="flex w-full justify-center btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Reset password
          </button>
          <RecaptchaLinks />
        </Form>
      )}
    </Formik>
  );
}
