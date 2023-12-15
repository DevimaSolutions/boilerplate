import clsx from 'clsx';
import React from 'react';

import useFileInput from './useFileInput';

import type { FiletInputProps } from './types';

export function FileInput({
  field,
  form: { touched, errors, ...form },
  label,
  className,
  labelProps,
  errorProps,
  multiple,
  ...props
}: FiletInputProps) {
  const { handleChange } = useFileInput({
    field,
    multiple,
    form: { touched, errors, ...form },
  });
  return (
    <div>
      {label ? (
        <label {...labelProps} className={clsx('label p-0', labelProps?.className)}>
          {label}
        </label>
      ) : null}
      <input
        multiple
        type="file"
        {...field}
        {...props}
        className={clsx(
          'file-input file-input-bordered border-solid w-full file-input-primary mt-2',
          className,
        )}
        onChange={handleChange}
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
