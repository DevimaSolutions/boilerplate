import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import type { AvatarProps } from './types';

export default function Avatar({ imageUri, size, onEdit }: AvatarProps) {
  return (
    <div className="relative">
      {onEdit ? (
        <PencilSquareIcon
          className="absolute top-[10%] right-[10%] bg-white p-[3%] rounded-full"
          height={size / 4.5}
          onClick={onEdit}
          width={size / 4.5}
        />
      ) : null}
      {imageUri ? (
        <Image
          alt="Profile picture"
          className="object-cover object-center rounded-full p-[12.5%]"
          height={size}
          src={imageUri}
          width={size}
        />
      ) : (
        <UserCircleIcon height={size} width={size} />
      )}
    </div>
  );
}
