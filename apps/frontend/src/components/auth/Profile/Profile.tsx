'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { useProfile } from './useProfile';

export function Profile() {
  const { data, isLoading } = useProfile();
  const content = useMemo(
    () =>
      isLoading ? (
        <span className="loading loading-spinner loading-md" />
      ) : (
        <div className="w-content p-8 sm:flex sm:space-x-6 shadow-xl rounded-lg">
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <Image
              alt="Profile picture"
              className="object-cover object-center w-full h-full rounded-full"
              height={24}
              src={data?.imageUri ?? 'avatar.svg'}
              width={24}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold mb-0">
              {data?.email.split('@').at(0) ?? 'Profile name'}
            </h2>
            <span className="dark:text-gray-400">Role: {data?.role}</span>

            <div className="flex items-center space-x-2">
              <svg
                aria-label="Email address"
                className="w-4 h-4"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  fill="currentColor"
                />
              </svg>
              <span className="dark:text-gray-400">{data?.email}</span>
            </div>
          </div>
        </div>
      ),
    [data, isLoading],
  );
  return (
    <main className="h-full flex flex-col justify-center items-center mt-10 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Profile page:
      </h2>
      {content}
    </main>
  );
}
