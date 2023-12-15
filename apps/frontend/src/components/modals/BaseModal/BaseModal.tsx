import { XMarkIcon } from '@heroicons/react/24/solid';

import type { BaseModalProps } from './types';

export default function BaseModal({ children, isOpen, onClose }: BaseModalProps) {
  return isOpen ? (
    <dialog className="modal modal-middle sm:modal-middle border-none modal-open">
      <div className="modal-box">
        {children}
        <XMarkIcon
          className=" text-black absolute top-6 right-6 w-6 h-6 hover:cursor-pointer"
          onClick={onClose}
        />
      </div>
      <form className="modal-backdrop" method="dialog" onSubmit={onClose}>
        <button className="hover:bg-none opacity-0" type="submit">
          close
        </button>
      </form>
    </dialog>
  ) : null;
}
