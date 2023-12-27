import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import type { ChangeEmailModalProps } from './types';
import type { ChangeEmailFormValues } from 'src/components/forms/ChangeEmailForm/types';

export const useChangeEmailModal = (onClose: ChangeEmailModalProps['onClose']) => {
  const onSubmit = async (values: ChangeEmailFormValues) => {
    const response = await usersApi.update(values);

    if (response.error) {
      toast.error(response.error.message);
      return;
    }
    toast.success('Email updated successfully!');
    onClose();
  };
  return { onSubmit };
};
