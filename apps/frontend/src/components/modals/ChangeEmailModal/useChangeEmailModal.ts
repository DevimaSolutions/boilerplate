import { usersApi } from 'api-client';
import { toast } from 'react-toastify';

import type { ChangeEmailFormValues } from 'src/components/forms/ChangeEmailForm/types';

export const useChangeEmailModal = () => {
  const onSubmit = async (values: ChangeEmailFormValues) => {
    const response = await usersApi.update({ email: values.email });

    if (response.error) {
      toast.error(response.error.message);
      return;
    }
    toast.success('Email updated successfully!');
  };
  return { onSubmit };
};
