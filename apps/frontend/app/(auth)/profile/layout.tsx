import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Profile - ${envUtil.getEnv().appName}`,
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
