import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Profile - ${envUtil.getEnv().appName}`,
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col justify-center items-center mt-10 sm:mx-auto sm:w-full sm:max-w-lg px-6 py-12">
      {children}
    </main>
  );
}
