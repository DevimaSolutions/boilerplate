import clsx from 'clsx';
import React from 'react';

import type { FiletInputProps } from './types';

export function FileInput({
  field,
  form: { touched, errors, setFieldValue },
  label,
  className,
  labelProps,
  errorProps,
  ...props
}: FiletInputProps) {
  return (
    <div>
      {label ? (
        <label {...labelProps} className={clsx('label p-0', labelProps?.className)}>
          {label}
        </label>
      ) : null}
      <input
        type="file"
        {...field}
        {...props}
        className={clsx(
          'file-input file-input-bordered border-solid w-full file-input-primary mt-2',
          className,
        )}
        onChange={async (event) => {
          if (!event.target.files?.length) {
            return;
          }
          if (props.multiple) {
            await setFieldValue(field.name, [...Array.from(event.target.files)]);
            return;
          }
          console.log('event target', event.target.files);
          await setFieldValue(field.name, event.target.files);
        }}
        value={undefined}
      />
      <label
        {...errorProps}
        className={clsx(
          'label label-text text-error p-0 min-h-[24px] h-full pt-1',
          errorProps?.className,
        )}
      >
        {touched[field.name] && errors[field.name] ? errors[field.name] : null}
      </label>
    </div>
  );
}

export default FileInput;
