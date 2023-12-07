import clsx from 'clsx';
import React from 'react';

import type { TextInputProps } from './types';

export function TextInput({
  field,
  form: { touched, errors },
  label,
  type = 'text',
  className,
  labelProps,
  errorProps,
  ...props
}: TextInputProps) {
  return (
    <div>
      {label ? (
        <label {...labelProps} className={clsx('label p-0', labelProps?.className)}>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        {...field}
        {...props}
        className={clsx('input input-bordered w-full input-primary mt-2', className)}
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

export default TextInput;
