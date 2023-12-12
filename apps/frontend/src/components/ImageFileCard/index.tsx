import clsx from 'clsx';
import Image from 'next/image';

import { bytesParser } from 'src/utils';

import type { HTMLAttributes } from 'react';

interface ImageFileCardProps extends HTMLAttributes<HTMLDivElement> {
  file: File;
}
export default function ImageFileCard({ file, className, ...props }: ImageFileCardProps) {
  return (
    <div
      className={clsx(
        'flex border-solid border border-gray-200 rounded-lg shadow items-center gap-2 p-2',
        className,
      )}
      {...props}
    >
      <Image
        alt=""
        height={0}
        sizes="100vw"
        src={URL.createObjectURL(file)}
        style={{ maxWidth: '100px', width: '100%', height: '100%' }}
        width={0}
      />

      <p className="m-0">
        {file.name}
        <br /> {bytesParser(file.size, 1)}
      </p>
    </div>
  );
}
