import { usersApi } from 'api-client';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

import { imageSchema } from 'src/validation-schemas/image.schema';

import type { ChangeEvent } from 'react';

const useUpdateAvatarInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
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
        router.refresh();
      } catch (error) {
        if (error instanceof ZodError) {
          toast.error(Array.isArray(error.issues) ? error.issues[0].message : error.message);
          return;
        }
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        throw error;
      }
    },
    [router],
  );

  return { inputRef, handleInputClick, handleChange };
};

export default useUpdateAvatarInput;
