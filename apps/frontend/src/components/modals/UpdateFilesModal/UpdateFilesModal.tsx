'use client';

import { UpdateFilesForm } from 'src/components/forms/UpdateFilesForm';

import { BaseModal } from '../BaseModal';

import { useUpdateFilesModal } from './useUpdateFilesModal';

import type { UpdateFilesModalProps } from './types';

export default function UpdateFilesModal(props: UpdateFilesModalProps) {
  const { onSubmit } = useUpdateFilesModal(props);
  return (
    <BaseModal {...props}>
      <h2 className="mt-0">Update your files</h2>
      <UpdateFilesForm onSubmit={onSubmit} />
    </BaseModal>
  );
}
