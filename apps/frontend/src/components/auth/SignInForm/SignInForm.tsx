'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { signInSchema } from 'src/validation-schemas';

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
      {({ isSubmitting, errors }) => (
        <Form className="space-y-6">
          <div>
            <label className="label p-0" htmlFor="email">
              Email address
            </label>
            <div className="mt-2">
              <Field
                className="box-border input input-bordered w-full input-primary"
                label="Email address"
                name="email"
                placeholder="email"
                type="email"
              />
              {Boolean(errors.email) && (
                <label className="label p-0 pt-1">
                  <span className="label-text text-error">{errors.email}</span>
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="label p-0" htmlFor="password">
              Password
            </label>
            <div className="mt-2">
              <Field
                className="box-border input input-bordered w-full input-primary"
                name="password"
                placeholder="password"
                type="password"
              />
              {Boolean(errors.password) && (
                <label className="label p-0 pt-1">
                  <span className="label-text text-error">{errors.password}</span>
                </label>
              )}
            </div>
          </div>
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
