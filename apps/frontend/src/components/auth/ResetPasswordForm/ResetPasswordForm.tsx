'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

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
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-3">
          <div>
            <label className="label p-0" htmlFor="password">
              New password
            </label>
            <Field
              className="input input-bordered w-full input-primary mt-2"
              name="password"
              placeholder="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <label className="label p-0 pt-1">
                <span className="label-text text-error">{errors.password}</span>
              </label>
            ) : (
              <div className="h-6" />
            )}
          </div>
          <div>
            <label className="label p-0" htmlFor="confirmPassword">
              Repeat new password
            </label>
            <Field
              className="input input-bordered w-full input-primary mt-2"
              name="confirmPassword"
              placeholder="confirm password"
              type="password"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <label className="label p-0 pt-1">
                <span className="label-text text-error">{errors.confirmPassword}</span>
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
