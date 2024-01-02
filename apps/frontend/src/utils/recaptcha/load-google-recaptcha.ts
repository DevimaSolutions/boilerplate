const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default async function loadGoogleRecaptcha(): Promise<void> {
  return new Promise((resolve) => {
    const existingScript = document.getElementById('googleRecaptcha');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${reCaptchaSiteKey}`;
      script.id = 'googleRecaptcha';
      document.body.appendChild(script);
      script.onload = () => {
        resolve();
      };
    } else {
      resolve();
    }
  });
}
