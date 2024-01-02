import { toast } from 'react-toastify';

import { envUtil } from '..';

import { checkRecaptchaToken } from './check-recaptcha-token';
import ensureGoogleRecaptchaLoaded from './ensure-google-recaptcha-loaded';

import type { RecaptchaResponse } from 'src/types/recaptcha.response';

const env = envUtil.getEnv();

export async function verifyReCaptcha(action: string) {
  await ensureGoogleRecaptchaLoaded();

  return new Promise<number>((res, rej) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(env.reCaptcha.siteKey, { action });
        const score = await checkRecaptchaToken(token).then((reCaptchaRes: RecaptchaResponse) => {
          if (reCaptchaRes.action !== action) {
            throw new Error('Incorrect action');
          }
          return reCaptchaRes.score;
        });
        res(score);
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
