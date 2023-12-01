import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { signUpSchema } from './schema';

import type { SignUpFormProps } from './types';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(signUpSchema)}
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
          <div>
            <label className="label p-0" htmlFor="password">
              Password
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
              Repeat password
            </label>
            <Field
              className="input input-bordered w-full input-primary mt-2"
              name="confirmPassword"
              placeholder="repeat password"
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
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
}
