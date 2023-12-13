import type { ReactNode } from 'react';

export interface BaseModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
