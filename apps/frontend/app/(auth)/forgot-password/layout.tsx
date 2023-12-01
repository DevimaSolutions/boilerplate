import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Forgot password - ${envUtil.getEnv().appName}`,
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
