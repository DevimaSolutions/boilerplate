import { CakeIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

import Avatar from 'src/components/Avatar/Avatar';

import type { BrowseProfileCardProps } from './types';

export default function BrowseProfileCard({ profile }: BrowseProfileCardProps) {
  return (
    <div className="w-full p-8 sm:flex sm:space-x-6  shadow-xl rounded-lg break-all">
      <div className="flex-shrink-0 flex justify-center items-center w-full mb-6 h-32 sm:w-32 sm:mb-0">
        <Avatar imageUri={profile.avatar} size={128} />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-0">{profile.username}</h2>
        <div className="flex items-center space-x-2">
          <CakeIcon className="h-5 w-5 text-yellow-600" />
          <span className="dark:text-gray-600">
            B-day: {format(new Date(profile.birthday), 'd MMMM yyyy')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <EnvelopeIcon className="h-5 w-5 text-gray-600" />
          <span className="dark:text-gray-600">{profile.email}</span>
        </div>
      </div>
    </div>
  );
}
