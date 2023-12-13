import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import type { UpdateFilesModalProps } from './types';
import type { FormikHelpers } from 'formik';
import type { UpdateFilesFormValues } from 'src/components/forms/UpdateFilesForm/types';

export const useUpdateFilesModal = ({ onClose }: UpdateFilesModalProps) => {
  const onSubmit = async (
    values: UpdateFilesFormValues,
    { resetForm, setErrors }: FormikHelpers<UpdateFilesFormValues>,
  ) => {
    const response = await usersApi.updateMultipleFile(values);
    if (response.error) {
      if ('errors' in response.error) {
        setErrors(response.error.errors);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    toast.success('Files updated successfully!');
    resetForm();
    onClose();
  };
  return { onSubmit };
};
