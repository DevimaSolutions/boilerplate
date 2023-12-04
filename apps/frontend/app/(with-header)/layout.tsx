import Header from 'src/components/Header/Header';

import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
