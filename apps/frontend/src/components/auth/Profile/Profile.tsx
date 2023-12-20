import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { authorizationApi } from 'api-client';

import { UpdateAvatarInput } from 'src/components/forms/UpdateAvatarForm';
import { ProfileSettings } from 'src/components/ProfileSettings';

export async function Profile() {
  const profile = await authorizationApi.getProfile().throwOnError();

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Profile page:
      </h2>
      <div className="w-fit p-8 flex flex-col gap-6 shadow-xl rounded-lg">
        <div className="w-fit sm:flex sm:space-x-6 ">
          <div className="flex-shrink-0 flex justify-center items-center w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <UpdateAvatarInput imageUri={profile.imageUri ?? ''} size={128} />
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold mb-0">
              {profile.email.split('@').at(0) ?? 'Profile name'}
            </h2>
            <span className="dark:text-gray-400">Role: {profile.role}</span>

            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-gray-500" />
              <span className="dark:text-gray-400">{profile.email}</span>
            </div>
          </div>
        </div>
        <ProfileSettings email={profile.email} />
      </div>
    </>
  );
}
