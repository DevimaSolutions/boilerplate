import clsx from 'clsx';

import type { CheckboxInputProps } from './types';

export default function CheckboxInput({
  field,
  form: { values, touched, errors, setFieldValue },
  label,
  className,
  labelProps,
  errorProps,
  ...props
}: CheckboxInputProps) {
  return (
    <div>
      <label {...labelProps} className="label justify-normal gap-3 cursor-pointer">
        <input
          checked={Boolean(values[field.name])}
          onChange={() => setFieldValue(field.name, !values[field.name])}
          type="checkbox"
          {...props}
          className={clsx(
            'checkbox border-solid border-[2px] border-primary checked:border-primary [--chkbg:theme(colors.primary)] [--chkfg:white]',
            className,
          )}
        />
        <span className="label-text">{label}</span>
      </label>
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
