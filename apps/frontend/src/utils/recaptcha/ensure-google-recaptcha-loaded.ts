import { envUtil } from '..';

const env = envUtil.getEnv();
let promise: Promise<void> | undefined;

export default async function ensureGoogleRecaptchaLoaded(): Promise<void> {
  if (!promise) {
    promise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${env.reCaptcha.siteKey}`;
      script.id = 'googleRecaptcha';
      document.body.appendChild(script);
      script.onload = () => {
        resolve();
      };
    });
  }

  return promise;
}
