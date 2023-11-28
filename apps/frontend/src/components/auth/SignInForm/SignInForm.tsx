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
        <Form className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
              Email address
            </label>
            <div className="mt-2">
              <Field
                className="block box-border	 w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                label="Email address"
                name="email"
                placeholder="email"
                type="email"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
              Email address
            </label>
            <div className="mt-2">
              <Field
                className="block box-border	 w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="password"
                placeholder="password"
                type="password"
              />
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
