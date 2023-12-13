import type { FormikHelpers } from 'formik';

export interface UpdateFilesFormValues {
  thumbnail: File | null;
  images: File[];
  someField: string;
  anyNumber: number;
  flag: boolean;
}

export interface UpdateFilesFormProps {
  onSubmit: (
    values: UpdateFilesFormValues,
    helpers: FormikHelpers<UpdateFilesFormValues>,
  ) => Promise<void>;
}
