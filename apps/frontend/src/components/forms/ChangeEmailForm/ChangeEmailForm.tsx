'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import TextInput from 'src/components/inputs/TextInput';

import { changeEmailSchema } from './schema';

import type { ChangeEmailFormProps } from './types';

export default function ChangeEmailForm({ email, onSubmit }: ChangeEmailFormProps) {
  return (
    <Formik
      initialValues={{ email }}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(changeEmailSchema)}
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
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
