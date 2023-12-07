import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

import type { PasswordInputProps } from './types';

export function PasswordInput({
  field,
  form: { touched, errors },
  label,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      {label ? <span className="label p-0">{label}</span> : null}
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
            onClick={toggleShow}
          />
        ) : (
          <EyeSlashIcon
            className="absolute top-3 right-5 w-6 h-6 hover:cursor-pointer"
            onClick={toggleShow}
          />
        )}
      </div>
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

export default PasswordInput;
