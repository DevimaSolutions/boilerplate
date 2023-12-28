import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { errorMessages } from 'src/constants';

export const useConfirmEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const confirmEmail = useCallback(
    async (confirmationToken: string) => {
      try {
        const response = await signIn('confirm-email', {
          token: confirmationToken,
          redirect: false,
        });

        if (!response?.ok) {
          toast.error(errorMessages.emailConfirmationFailed, {
            toastId: 'emailConfirmationFailed',
          });
          router.replace('/sign-up');
          return;
        }
        router.refresh();
      } catch {
        toast.error(errorMessages.emailConfirmationFailed, { toastId: 'emailConfirmationFailed' });
        router.replace('/sign-up');
      }
    },
    [router],
  );

  useEffect(() => {
    if (!token?.length) {
      router.replace('/sign-up');
      return;
    }
    void confirmEmail(token);
  }, [confirmEmail, router, token]);
};
