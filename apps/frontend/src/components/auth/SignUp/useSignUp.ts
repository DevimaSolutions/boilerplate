import { authorizationApi } from 'api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { envUtil } from 'src/utils';
import { verifyRecaptcha } from 'src/utils/recaptcha/verify-recaptcha';

import type { SignUpFormValues } from '../SignUpForm';
import type { FormikHelpers } from 'formik';

const env = envUtil.getEnv();

export const useSignUp = () => {
  const router = useRouter();

  const onSubmit = async (
    values: SignUpFormValues,
    { setErrors }: FormikHelpers<SignUpFormValues>,
  ) => {
    if (env.reCaptcha.secretKey && env.reCaptcha.siteKey) {
      const score = await verifyRecaptcha('singUp');
      if (score <= 0.5) {
        setErrors({
          email: ' ',
          password: 'Sorry, Google Recaptcha has detected you as a bot',
        });
        return;
      }
    }

    const response = await authorizationApi.signUp({ ...values });

    if (response.error) {
      toast.error(response.error.message);
      return;
    }

    router.replace(`/verify-email?email=${encodeURIComponent(values.email)}`);
  };
  return { onSubmit };
};
