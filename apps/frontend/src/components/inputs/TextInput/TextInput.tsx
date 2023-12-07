import clsx from 'clsx';
import React from 'react';

import type { TextInputProps } from './types';

export function TextInput({
  field,
  form: { touched, errors },
  label,
  type = 'text',
  className,
  ...props
}: TextInputProps) {
  return (
    <div>
      {label ? <span className="label p-0">{label}</span> : null}
      <input
        type={type}
        {...field}
        {...props}
        className={clsx('input input-bordered w-full input-primary mt-2', className)}
      />
      {touched[field.name] && errors[field.name] ? (
        <label className="label p-0 pt-1">
          <span className="label-text text-error">{errors[field.name]}</span>
        </label>
      ) : (
        <div className="h-6" />
      )}
    </div>
  );
}

export default TextInput;
