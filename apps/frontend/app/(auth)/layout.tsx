import { ToastContainer } from 'react-toastify';

import type { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="flex flex-col justify-center align-center mt-10 sm:mx-auto sm:w-full sm:max-w-md px-6 py-12">
        {children}
      </main>
      <ToastContainer />
    </>
  );
}
