'use client';

import { GeneralSettingsForm } from 'src/components/forms/GeneralSettingsForm';

import { BaseModal } from '../BaseModal';

import { useGeneralSettingsModal } from './useGeneralSettingsModal';

interface GeneralSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GeneralSettingsModal(props: GeneralSettingsModalProps) {
  const { onSubmit } = useGeneralSettingsModal();
  return (
    <BaseModal {...props}>
      <h2 className="mt-0">Enter some configurations</h2>
      <GeneralSettingsForm onSubmit={onSubmit} />
    </BaseModal>
  );
}
