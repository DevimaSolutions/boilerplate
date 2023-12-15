import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import { updateFilesSchema } from 'src/components/forms/UpdateFilesForm/schema';

import type { UpdateFilesModalProps } from './types';
import type { FormikHelpers } from 'formik';
import type { UpdateFilesFormValues } from 'src/components/forms/UpdateFilesForm/types';

export const useUpdateFilesModal = ({ onClose }: UpdateFilesModalProps) => {
  const onSubmit = async (
    values: UpdateFilesFormValues,
    { setErrors }: FormikHelpers<UpdateFilesFormValues>,
  ) => {
    const checkResult = await updateFilesSchema.safeParseAsync(values);
    if (!checkResult.success) {
      toast.error(
        Array.isArray(checkResult.error.issues)
          ? checkResult.error.issues[0].message
          : checkResult.error.message,
      );
      return;
    }
    const response = await usersApi.updateMultipleFile(checkResult.data);
    if (response.error) {
      if ('errors' in response.error) {
        setErrors(response.error.errors);
      } else {
        toast.error(response.error.message);
      }
      return;
    }
    toast.success('Files updated successfully!');
    onClose();
  };
  return { onSubmit };
};
