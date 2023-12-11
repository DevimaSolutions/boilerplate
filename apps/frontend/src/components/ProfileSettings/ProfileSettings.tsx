'use client';

import { useState } from 'react';

import { ChangeEmailModal } from '../modals/ChangeEmailModal';

export default function ProfileSettings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center gap-2 w-full ml-0">
      <button
        className="btn btn-primary "
        onClick={() => {
          setIsOpen((val) => !val);
        }}
        type="button"
      >
        Change email
      </button>
      <ChangeEmailModal
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
      />
      <button className="btn">General settings</button>
    </div>
  );
}
