import type { FormikHelpers } from 'formik';

export interface GeneralSettingsFormValues {
  thumbnail: File | null;
  images: File[];
  someField: string;
  anyNumber: number;
  flag: boolean;
}

export interface GeneralSettingsFormProps {
  onSubmit: (
    values: GeneralSettingsFormValues,
    helpers: FormikHelpers<GeneralSettingsFormValues>,
  ) => Promise<void>;
}
