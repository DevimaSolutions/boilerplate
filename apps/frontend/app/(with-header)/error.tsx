'use client'; // Error components must be Client Components

import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mt-20 w-full flex flex-col justify-center items-center">
      <div className="h-[85px] w-[85px] rounded-full flex justify-center items-center self-center bg-red-100">
        <ExclamationCircleIcon className="h-14 w-14 text-error" />
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Oh no, something went wrong!
      </h2>
      <p className="w-full text-center mt-0">{error.message}</p>
      <button
        className="flex justify-center btn btn-primary"
        onClick={
          // Attempt to recover by trying to re-render the route
          () => {
            reset();
          }
        }
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
