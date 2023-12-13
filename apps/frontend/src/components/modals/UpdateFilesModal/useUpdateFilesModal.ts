import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import type { UpdateFilesModalProps } from './types';
import type { ValidationErrorDto } from 'api-client';
import type { FormikHelpers } from 'formik';
import type { UpdateFilesFormValues } from 'src/components/forms/UpdateFilesForm/types';

export const useUpdateFilesModal = ({ onClose }: UpdateFilesModalProps) => {
  const onSubmit = async (
    values: UpdateFilesFormValues,
    { resetForm, setErrors }: FormikHelpers<UpdateFilesFormValues>,
  ) => {
    const response = await usersApi.updateMultipleFile(values);
    if (response.error) {
      toast.error(response.error.message);
      setErrors((response.error as ValidationErrorDto).errors);
      return;
    }
    toast.success('Files updated successfully!');
    resetForm();
    onClose();
  };
  return { onSubmit };
};
