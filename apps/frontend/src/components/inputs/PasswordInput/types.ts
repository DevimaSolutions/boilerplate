import type { FieldProps } from 'formik';
import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export interface PasswordInputProps<
  V = string,
  FormValues extends Record<string, unknown> = Record<string, unknown>,
> extends FieldProps<V, FormValues>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  errorProps?: LabelHTMLAttributes<HTMLLabelElement>;
}
