import { toast } from 'react-toastify';

import { envUtil } from '..';

import { checkRecaptchaToken } from './check-recaptcha-token';
import ensureGoogleRecaptchaLoaded from './ensure-google-recaptcha-loaded';

const env = envUtil.getEnv();

export async function verifyRecaptcha(action: string) {
  await ensureGoogleRecaptchaLoaded();

  if (!env.reCaptcha.siteKey) {
    return { score: 1, hasValidRecaptchaScore: true };
  }

  return new Promise<{ score: number; hasValidRecaptchaScore: boolean }>((res, rej) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(env.reCaptcha.siteKey, { action });
        const response = await checkRecaptchaToken(token);
        if (response.action !== action) {
          throw new Error('Incorrect action');
        }
        res({ score: response.score, hasValidRecaptchaScore: response.score > 0.5 });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('It seems that there was an error while checking the captcha');
        }
        rej(error);
      }
    });
  });
}
