import { authorizationApi } from 'api-client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { User } from 'api-client';

export const useProfile = () => {
  const [profile, setProfile] = useState<User | undefined>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await authorizationApi.getProfile();
      if (response.ok) {
        setProfile(response.data);
      } else {
        throw new Error(
          response.error ? (response.error as Error).message : 'Something went wrong',
        );
      }
    };

    getProfile().catch((error: Error) => {
      toast.error(error.message);
    });
  }, [setProfile]);

  return { profile };
};
