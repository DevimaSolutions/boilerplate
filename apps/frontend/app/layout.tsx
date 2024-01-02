import './globals.css';
import { Inter } from 'next/font/google';

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
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
