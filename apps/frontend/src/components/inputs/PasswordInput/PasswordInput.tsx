import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

import type { PasswordInputProps } from './types';

export function PasswordInput({
  field,
  form: { touched, errors },
  label,
  className,
  labelProps,
  errorProps,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      {label ? (
        <label className="label p-0" {...labelProps}>
          {label}
        </label>
      ) : null}
      <div className="relative border-green w-full mt-2">
        <input
          type={showPassword ? 'text' : 'password'}
          {...field}
          {...props}
          className={clsx('input input-bordered w-full input-primary pr-11', className)}
        />
        {showPassword ? (
          <EyeIcon
            className="absolute top-3 right-5 w-6 h-6 hover:cursor-pointer"
            onClick={toggleShowPassword}
          />
        ) : (
          <EyeSlashIcon
            className="absolute top-3 right-5 w-6 h-6 hover:cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
      </div>
      <label className="label label-text text-error p-0 h-6 pt-1" {...errorProps}>
        {touched[field.name] && errors[field.name] ? errors[field.name] : null}
      </label>
    </div>
  );
}

export default PasswordInput;
