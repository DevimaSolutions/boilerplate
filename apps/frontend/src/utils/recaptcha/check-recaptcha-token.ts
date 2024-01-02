'use server';

import { envUtil } from '..';

import type { RecaptchaResponse } from 'src/types/recaptcha.response';

const env = envUtil.getEnv();

export async function checkRecaptchaToken(token: string) {
  return fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${env.reCaptcha.secretKey}&response=${token}`,
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<RecaptchaResponse>;
  });
}
