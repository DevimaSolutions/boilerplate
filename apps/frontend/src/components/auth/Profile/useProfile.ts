import { useEffect, useState } from 'react';

import type { UserProfileDto } from 'src/data-transfer/dto/user-profile.dto';

export const useProfile = () => {
  const [data, setData] = useState<UserProfileDto | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const onGetProfile = async (): Promise<UserProfileDto> => {
      const res = await fetch('/api/authorization/profile');
      return (await res.json()) as UserProfileDto;
    };
    onGetProfile()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        //TODO: add error handling
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { data, isLoading };
};
