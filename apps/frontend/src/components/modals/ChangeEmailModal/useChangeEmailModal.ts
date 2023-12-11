import { toast } from 'react-toastify';

import type { ChangeEmailFormValues } from 'src/components/forms/ChangeEmailForm/types';

export const useChangeEmailModal = () => {
  const onSubmit = async (values: ChangeEmailFormValues) => {
    // Call NextAuth api route
    const response = await fetch('/api/users/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        email: values.email,
      }),
    });
    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    toast.success('Email updated successfully!');
  };
  return { onSubmit };
};
