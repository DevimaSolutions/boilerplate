'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import CheckboxInput from 'src/components/inputs/CheckboxInput';
import TextInput from 'src/components/inputs/TextInput';

import { generalSettingsSchema } from './schema';

import type { GeneralSettingsFormProps } from './types';

const initialValues = {
  thumbnail: null,
  images: [],
  someField: '',
  anyNumber: 0,
  flag: false,
};

export default function GeneralSettingsForm({ onSubmit }: GeneralSettingsFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(generalSettingsSchema)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <Field component={TextInput} label="Some text" name="someField" placeholder="Type text" />
          <Field
            component={TextInput}
            label="Any number"
            name="anyNumber"
            placeholder="Type number"
            type="numeric"
          />
          {/*TODO: check numeric types*/}
          <Field component={CheckboxInput} label="Flag" name="flag" />
          {/*TODO: add file inputs*/}
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
