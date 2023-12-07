import type { FieldProps } from 'formik';
import type { InputHTMLAttributes } from 'react';

export interface TextInputProps<
  V = string,
  FormValues extends Record<string, unknown> = Record<string, unknown>,
> extends FieldProps<V, FormValues>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  label?: string;
}
