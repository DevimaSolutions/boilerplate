'use server';
const recaptchaSecretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
export async function checkRecaptchaToken(token: string) {
  return fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', //
    },
    body: `secret=${recaptchaSecretKey}&response=${token}`,
  })
    .then((reCaptchaRes) => reCaptchaRes.json())
    .then((reCaptchaRes) => {
      console.log(reCaptchaRes, 'Response from Google reCatpcha verification API');
      return reCaptchaRes.score as number;
    })
    .catch((err: any) => {
      console.log(err);
      return 0;
    });
}
