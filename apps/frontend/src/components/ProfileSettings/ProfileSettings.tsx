'use client';

import { useState } from 'react';

import { ChangeEmailModal } from '../modals/ChangeEmailModal';
import { GeneralSettingsModal } from '../modals/GeneralSettingsModal';

export default function ProfileSettings() {
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState<boolean>(false);
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState<boolean>(false);
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
        onClose={() => {
          setIsChangeEmailOpen(false);
        }}
        open={isChangeEmailOpen}
      />
      <button
        className="btn"
        onClick={() => {
          setIsGeneralSettingsOpen((val) => !val);
        }}
        type="button"
      >
        General settings
      </button>
      <GeneralSettingsModal
        onClose={() => {
          setIsGeneralSettingsOpen(false);
        }}
        open={isGeneralSettingsOpen}
      />
    </div>
  );
}
