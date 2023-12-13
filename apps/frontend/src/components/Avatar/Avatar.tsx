import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import type { AvatarProps } from './types';

export default function Avatar({ imageUri, size, onEdit }: AvatarProps) {
  return (
    <div className="relative">
      {imageUri ? (
        <Image
          alt="Profile picture"
          className="object-cover object-center rounded-full"
          height={size}
          src={imageUri}
          width={size}
        />
      ) : (
        <UserCircleIcon height={size} width={size} />
      )}
      {onEdit ? (
        <PencilSquareIcon
          className="absolute top-[12%] right-[12%] bg-white p-[3%] rounded-full"
          height={size / 4}
          onClick={onEdit}
          width={size / 4}
        />
      ) : null}
    </div>
  );
}
