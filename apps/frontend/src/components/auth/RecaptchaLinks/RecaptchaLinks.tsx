import Link from 'next/link';

export default function RecaptchaLinks() {
  return (
    <small className="my-2 text-gray-500">
      This site is protected by reCAPTCHA and the Google{' '}
      <Link
        className="link link-primary no-underline"
        href="https://policies.google.com/privacy"
        target="_blank"
      >
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link
        className="link link-primary no-underline"
        href="https://policies.google.com/terms"
        target="_blank"
      >
        Terms of Service
      </Link>{' '}
      apply.
    </small>
  );
}
