import type { FieldProps } from 'formik';
import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export interface CheckboxInputProps<
  V = string,
  FormValues extends Record<string, unknown> = Record<string, unknown>,
> extends FieldProps<V, FormValues>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'type'> {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  errorProps?: LabelHTMLAttributes<HTMLLabelElement>;
}
