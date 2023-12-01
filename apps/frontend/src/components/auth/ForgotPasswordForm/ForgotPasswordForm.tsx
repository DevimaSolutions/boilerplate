'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

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
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-3">
          <div>
            <label className="label p-0" htmlFor="email">
              {/*TODO: Create components for the form fields that will have label, input, and error nodes encapsulated.*/}
              Email address
            </label>
            <Field
              className="input input-bordered w-full input-primary mt-2"
              label="Email address"
              name="email"
              placeholder="email"
              type="email"
            />
            {errors.email && touched.email ? (
              <label className="label p-0 pt-1">
                <span className="label-text text-error">{errors.email}</span>
              </label>
            ) : (
              <div className="h-6" />
            )}
          </div>
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
