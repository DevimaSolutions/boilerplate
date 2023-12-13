'use client';

import { ChangeEmailForm } from 'src/components/forms/ChangeEmailForm';

import { BaseModal } from '../BaseModal';

import { useChangeEmailModal } from './useChangeEmailModal';

import type { ChangeEmailModalProps } from './types';

export default function ChangeEmailModal(props: ChangeEmailModalProps) {
  const { onSubmit } = useChangeEmailModal(props);
  return (
    <BaseModal {...props}>
      <h2 className="mt-0">Enter new email</h2>
      <ChangeEmailForm onSubmit={onSubmit} />
    </BaseModal>
  );
}