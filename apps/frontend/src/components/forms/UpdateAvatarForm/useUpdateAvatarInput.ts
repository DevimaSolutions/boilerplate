import { usersApi } from 'api-client';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { imageSchema } from 'src/validation-schemas/image.schema';

import type { UpdateAvatarInputProps } from './types';
import type { ChangeEvent } from 'react';

const useUpdateAvatarInput = ({ imageUri: initImage }: UpdateAvatarInputProps) => {
  const [imageUri, setImageUri] = useState<string>(initImage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const handleChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.[0]) {
      return;
    }
    const checkedImage = await imageSchema.safeParseAsync(e.currentTarget.files[0]);

    if (!checkedImage.success) {
      toast.error(
        Array.isArray(checkedImage.error.issues)
          ? checkedImage.error.issues[0].message
          : checkedImage.error.message,
      );
      return;
    }
    const response = await usersApi.update({ image: checkedImage.data });

    if (response.error) {
      toast.error(response.error.message);
      return;
    }
    toast.success('Avatar updated successfully!');
    setImageUri(response.data.imageUri ?? '');
  }, []);

  return { imageUri, inputRef, handleInputClick, handleChange };
};

export default useUpdateAvatarInput;
