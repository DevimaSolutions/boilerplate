import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import type { ReactNode } from 'react';

interface BaseModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function BaseModal({ children, open, onClose }: BaseModalProps) {
  return (
    <div className={clsx('modal modal-bottom sm:modal-middle', open && 'modal-open')}>
      <div className="modal-box">
        {children}
        <XMarkIcon
          className=" text-black absolute top-6 right-6 w-6 h-6 hover:cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
