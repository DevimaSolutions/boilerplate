import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

import { SignOutButton } from 'src/components/auth/SignOutButton';
import { envUtil } from 'src/utils';
import { getServerUser } from 'src/utils/auth/get-server-user';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

const env = envUtil.getEnv();

export const metadata: Metadata = {
  title: env.appName,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const user = await getServerUser();

  return (
    <html lang="en">
      <body className={`h-[100vh] m-0 box-border ${inter.className}`}>
        <header className="sticky top-0 w-full h-[60px] px-[40px] box-border flex items-center justify-between bg-primary shadow-[0_0px_16px_0px_rgba(22,74,162,0.06)]">
          {user ? (
            <>
              <Link className="text-white flex items-center gap-[10px]" href="/profile">
                <div className="avatar">
                  <div className="w-6 rounded-full">
                    <Image alt="Profile picture" height={24} src="avatar.svg" width={24} />
                  </div>
                </div>
                {user.email}
              </Link>
              <SignOutButton />
            </>
          ) : null}
        </header>
        <div className="flex flex-col grow">
          <div className="grow"> {children}</div>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
