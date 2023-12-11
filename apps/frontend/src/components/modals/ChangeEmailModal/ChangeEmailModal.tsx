'use client';

import { ChangeEmailForm } from 'src/components/forms/ChangeEmailForm';

import { BaseModal } from '../BaseModal';

import { useChangeEmailModal } from './useChangeEmailModal';

interface ChangeEmailModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangeEmailModal(props: ChangeEmailModalProps) {
  const { onSubmit } = useChangeEmailModal();
  return (
    <BaseModal {...props}>
      <h2>Enter new email</h2>
      <ChangeEmailForm onSubmit={onSubmit} />
    </BaseModal>
  );
}
