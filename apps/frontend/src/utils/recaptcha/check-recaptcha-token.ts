'use server';

import { envUtil } from '..';

const env = envUtil.getEnv();

export async function checkRecaptchaToken(token: string) {
  return fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${env.reCaptcha.secretKey}&response=${token}`,
  }).then((reCaptchaRes) => reCaptchaRes.json());
}
