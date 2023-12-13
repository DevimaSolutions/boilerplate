import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import type { UpdateFilesModalProps } from './types';
import type { FormikHelpers } from 'formik';
import type { UpdateFilesFormValues } from 'src/components/forms/UpdateFilesForm/types';

export const useUpdateFilesModal = ({ onClose }: UpdateFilesModalProps) => {
  const onSubmit = async (
    { thumbnail, ...values }: UpdateFilesFormValues,
    { resetForm }: FormikHelpers<UpdateFilesFormValues>,
  ) => {
    if (!thumbnail) {
      return;
    }
    const response = await usersApi.updateMultipleFile({ thumbnail, ...values });
    if (response.error) {
      toast.error(response.error.message);
      return;
    }

    toast.success('Files updated successfully!');
    resetForm();
    onClose();
  };
  return { onSubmit };
};
