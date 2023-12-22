import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

const env = envUtil.getEnv();

export const metadata: Metadata = {
  title: env.appName,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      {/*TODO: dynamically import script*/}
      <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} />
    </html>
  );
}
