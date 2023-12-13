'use client';

import { useState } from 'react';

import { ChangeEmailModal } from '../modals/ChangeEmailModal';
import { UpdateFilesModal } from '../modals/UpdateFilesModal';

export default function ProfileSettings() {
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState<boolean>(false);
  const [isUpdateFilesOpen, setIsUpdateFilesOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center gap-2 w-full ml-0">
      <button
        className="btn btn-primary "
        onClick={() => {
          setIsChangeEmailOpen((val) => !val);
        }}
        type="button"
      >
        Change email
      </button>
      <ChangeEmailModal
        isOpen={isChangeEmailOpen}
        onClose={() => {
          setIsChangeEmailOpen(false);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          setIsUpdateFilesOpen((val) => !val);
        }}
        type="button"
      >
        Update files
      </button>
      <UpdateFilesModal
        isOpen={isUpdateFilesOpen}
        onClose={() => {
          setIsUpdateFilesOpen(false);
        }}
      />
    </div>
  );
}
