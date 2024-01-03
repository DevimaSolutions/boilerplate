'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import ImageFileCard from 'src/components/cards/ImageFileCard';
import CheckboxInput from 'src/components/inputs/CheckboxInput';
import FileInput from 'src/components/inputs/FileInput';
import TextInput from 'src/components/inputs/TextInput';
import { fileConstants } from 'src/constants';

import { updateFilesSchema } from './schema';

import type { UpdateFilesFormProps } from './types';

const initialValues = {
  thumbnail: undefined,
  images: [],
  someField: '',
  anyNumber: 0,
  flag: false,
};

export default function UpdateFilesForm({ onSubmit }: UpdateFilesFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(updateFilesSchema)}
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-3">
          <Field component={TextInput} label="Some text" name="someField" placeholder="Type text" />
          <Field
            component={TextInput}
            label="Any number"
            name="anyNumber"
            placeholder="Type number"
            type="number"
          />
          <Field component={CheckboxInput} label="Flag" name="flag" />
          <Field
            accept={fileConstants.imageMimeTypes}
            component={FileInput}
            label="Add your thumbnail"
            name="thumbnail"
          />
          {values.thumbnail ? <ImageFileCard file={values.thumbnail} /> : null}
          <Field
            accept={fileConstants.imageMimeTypes}
            component={FileInput}
            label="Add multiple images"
            multiple
            name="images"
          />
          {values.images.length
            ? values.images.map((image, index) => <ImageFileCard file={image} key={index} />)
            : null}
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
