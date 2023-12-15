import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import type { ChangeEmailModalProps } from './types';
import type { FormikHelpers } from 'formik';
import type { ChangeEmailFormValues } from 'src/components/forms/ChangeEmailForm/types';

export const useChangeEmailModal = ({ email, onClose }: ChangeEmailModalProps) => {
  const onSubmit = async (
    values: ChangeEmailFormValues,
    { resetForm }: FormikHelpers<ChangeEmailFormValues>,
  ) => {
    const response = await usersApi.update(values);

    if (response.error) {
      toast.error(response.error.message);
      return;
    }
    toast.success('Email updated successfully!');
    resetForm();
    onClose();
    //TODO: investigate sign out after email change
  };
  return { onSubmit, email };
};
