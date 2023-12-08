import { ToastContainer } from 'react-toastify';

import Header from 'src/components/headers/Header';

import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <ToastContainer />
    </>
  );
}
