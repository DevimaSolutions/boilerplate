import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Dummy Data - ${envUtil.getEnv().appName}`,
};
export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col justify-center items-center sm:mx-auto sm:w-full px-6 ">
      {children}
    </main>
  );
}
