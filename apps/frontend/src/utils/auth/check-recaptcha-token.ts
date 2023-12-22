'use server';

export async function checkRecaptchaToken(token: string) {
  const recaptchaSecretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
  await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //
    },
    body: JSON.stringify({ secret: recaptchaSecretKey, response: token }),
    //`https://www.google.com/recaptcha/api/siteverify?secret=6LdxdzgpAAAAAM91BOAuPw7fJXLcKkWFwcI7-a_H&response=${token}`,
    //`secret=${recaptchaKey}&response=${token}`,
  })
    .then((reCaptchaRes) => reCaptchaRes.json())
    .then((reCaptchaRes) => {
      console.log(reCaptchaRes, 'Response from Google reCatpcha verification API');
      if (reCaptchaRes?.score > 0.5) {
        // Save data to the database from here
        console.log('success');
      } else {
        console.log('failure');
      }
    })
    .catch((err: any) => {
      console.log(err);
    });

  console.log(token);
}
