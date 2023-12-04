import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useVerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email?.length) {
      router.replace('/sign-up');
    }
  }, [router, email?.length]);

  return { email };
};
