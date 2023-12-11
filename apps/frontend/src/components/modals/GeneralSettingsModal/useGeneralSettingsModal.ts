import { toast } from 'react-toastify';

import type { GeneralSettingsFormValues } from 'src/components/forms/GeneralSettingsForm/types';

export const useGeneralSettingsModal = () => {
  const onSubmit = async (values: GeneralSettingsFormValues) => {
    const response = await fetch('/api/users/gallery', {
      method: 'PATCH',
      body: JSON.stringify({
        ...values,
      }),
    });
    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    toast.success('Settings updated successfully!');
  };
  return { onSubmit };
};
