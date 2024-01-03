import clsx from 'clsx';
import Image from 'next/image';

import bytesParser from 'src/utils/bytes-parser.util';

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
        alt={file.name}
        className="max-w-[100px] w-full h-full"
        height={0}
        sizes="100vw"
        src={URL.createObjectURL(file)}
        width={0}
      />

      <p className="m-0 break-all">
        {file.name}
        <br /> {bytesParser(file.size, 1)}
      </p>
    </div>
  );
}
