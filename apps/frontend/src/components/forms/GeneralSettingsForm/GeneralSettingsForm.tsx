'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import ImageFileCard from 'src/components/ImageFileCard';
import CheckboxInput from 'src/components/inputs/CheckboxInput';
import FileInput from 'src/components/inputs/FileInput';
import TextInput from 'src/components/inputs/TextInput';
import { fileConstants } from 'src/constants';

import { generalSettingsSchema } from './schema';

import type { GeneralSettingsFormProps } from './types';

const initialValues = {
  thumbnail: [],
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
      {({ isSubmitting, values, errors }) => (
        <Form className="space-y-3">
          {console.log(values)}
          {console.log(errors)}
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
            label="Choose your thumbnail"
            name="thumbnail"
          />
          {values.thumbnail[0] ? <ImageFileCard file={values.thumbnail[0]} /> : null}
          <Field
            accept={fileConstants.imageMimeTypes}
            component={FileInput}
            label="Choose multiple images"
            multiple
            name="images"
          />
          {values.images.length
            ? values.images.map((image, index) => (
                <ImageFileCard file={image} key={`${image.name}-${index}`} />
              ))
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
