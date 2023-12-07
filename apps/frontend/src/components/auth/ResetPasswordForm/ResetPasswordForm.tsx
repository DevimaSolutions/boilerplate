'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import PasswordInput from 'src/components/inputs/PasswordInput';

import { resetPasswordSchema } from './schema';

import type { ResetPasswordFormProps } from './types';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(resetPasswordSchema)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <Field
            component={PasswordInput}
            label="Password"
            name="password"
            placeholder="password"
          />
          <Field
            component={PasswordInput}
            label="Repeat new password"
            name="confirmPassword"
            placeholder="confirm password"
          />
          <button
            className="flex w-full justify-center btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Reset password
          </button>
        </Form>
      )}
    </Formik>
  );
}
