import { usersApi } from 'api-client';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { imageSchema } from 'src/validation-schemas/image.schema';

import type { UpdateAvatarInputProps } from './types';
import type { ChangeEvent } from 'react';
import type { ZodError } from 'zod';

const useUpdateAvatarInput = ({ imageUri: initImage }: UpdateAvatarInputProps) => {
  const [imageUri, setImageUri] = useState(initImage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.[0]) {
      return;
    }
    try {
      const checkedImage = await imageSchema.parseAsync(e.currentTarget.files[0]);

      const response = await usersApi.update({ image: checkedImage });

      if (response.error) {
        toast.error(response.error.message);
        return;
      }

      toast.success('Avatar updated successfully!');
      setImageUri(response.data.imageUri ?? '');
    } catch (error) {
      const zodError = error as ZodError;
      toast.error(Array.isArray(zodError.issues) ? zodError.issues[0].message : zodError.message);
    }
  }, []);

  return { imageUri, inputRef, handleInputClick, handleChange };
};

export default useUpdateAvatarInput;
