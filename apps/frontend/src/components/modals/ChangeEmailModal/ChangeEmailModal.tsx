'use client';

import { ChangeEmailForm } from 'src/components/forms/ChangeEmailForm';

import { BaseModal } from '../BaseModal';

import { useChangeEmailModal } from './useChangeEmailModal';

import type { ChangeEmailModalProps } from './types';

export default function ChangeEmailModal({ email, ...props }: ChangeEmailModalProps) {
  const { onSubmit } = useChangeEmailModal(props.onClose);
  return (
    <BaseModal {...props}>
      <h2 className="mt-0">Enter new email</h2>
      <ChangeEmailForm email={email} onSubmit={onSubmit} />
    </BaseModal>
  );
}
