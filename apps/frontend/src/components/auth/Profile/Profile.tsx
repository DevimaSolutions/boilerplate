import { EnvelopeIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { authorizationApi } from 'api-client';
import { cookies } from 'next/headers';
import Image from 'next/image';

export async function Profile() {
  const profile = await authorizationApi
    .getProfile({
      //TODO: fix api-client request
      headers: {
        Cookie: cookies()
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join('; '),
      },
    })
    .then((res) => res.data)
    .catch(() => {
      //TODO: add handle error
    });

  return (
    <main className="h-full flex flex-col justify-center items-center mt-10 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Profile page:
      </h2>
      <div className="w-content p-8 sm:flex sm:space-x-6 shadow-xl rounded-lg">
        <div className="flex-shrink-0 flex justify-center items-center w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          {profile?.imageUri ? (
            <Image
              alt="Profile picture"
              className="object-cover object-center w-[81%] h-[81%] rounded-full"
              height={24}
              src={profile.imageUri}
              width={24}
            />
          ) : (
            <UserCircleIcon className="h-full w-full text-gray-500" />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold mb-0">
            {profile?.email.split('@').at(0) ?? 'Profile name'}
          </h2>
          <span className="dark:text-gray-400">Role: {profile?.role}</span>

          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-500" />
            <span className="dark:text-gray-400">{profile?.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
