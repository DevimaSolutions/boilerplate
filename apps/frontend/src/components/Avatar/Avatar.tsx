import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import type { AvatarProps } from './types';

export default function Avatar({ imageUri, size, onEdit }: AvatarProps) {
  return (
    <div className="relative">
      {onEdit ? (
        <button
          className="absolute w-8 h-8 top-2 right-2 border-none bg-white p-1 rounded-full hover:cursor-pointer"
          onClick={onEdit}
          type="button"
        >
          <PencilSquareIcon />
        </button>
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
