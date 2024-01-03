'use client';

import Avatar from 'src/components/Avatar/Avatar';
import { fileConstants } from 'src/constants';

import useUpdateAvatarInput from './useUpdateAvatarInput';

import type { UpdateAvatarInputProps } from './types';

export default function UpdateAvatarInput({
  disabled,
  size = 50,
  imageUri,
}: UpdateAvatarInputProps) {
  const { inputRef, handleInputClick, handleChange } = useUpdateAvatarInput();
  return (
    <>
      <input
        accept={fileConstants.imageMimeTypes.join(', ')}
        disabled={disabled}
        hidden
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      <Avatar imageUri={imageUri} onEdit={handleInputClick} size={size} />
    </>
  );
}
