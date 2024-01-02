import { checkRecaptchaToken } from './check-recaptcha-token';
import loadGoogleRecaptcha from './load-google-recaptcha';

import type { RecaptchaResponse } from 'src/types/recaptcha.response';

const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export async function verifyReCaptcha(action: string) {
  await loadGoogleRecaptcha();
  return new Promise<number>((res, rej) => {
    window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute(reCaptchaSiteKey ?? '', { action });
      const score = await checkRecaptchaToken(token)
        .then((reCaptchaRes: RecaptchaResponse) => {
          if (reCaptchaRes.action !== action) {
            rej(new Error('Incorrect action'));
          }
          return reCaptchaRes.score;
        })
        .catch((err) => {
          rej(err);
          return 0;
        });
      res(score);
    });
  });
}
