import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import type { AvatarProps } from './types';

export default function Avatar({ imageUri, size }: AvatarProps) {
  return imageUri ? (
    <Image
      alt="Profile picture"
      className="object-cover object-center rounded-full"
      height={size}
      src={imageUri}
      width={size}
    />
  ) : (
    <UserCircleIcon className={`h-[${size}] w-[${size}]`} />
  );
}
