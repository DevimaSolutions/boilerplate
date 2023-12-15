import type { ProfileSettingsProps } from 'src/components/ProfileSettings/types';

export interface ChangeEmailModalProps extends ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}
