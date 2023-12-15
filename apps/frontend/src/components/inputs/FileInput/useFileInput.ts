import { useCallback, useRef } from 'react';

import type { FiletInputProps } from './types';
import type { ChangeEvent } from 'react';

const useFileInput = ({
  field,
  form: { setFieldValue },
  multiple,
}: Pick<FiletInputProps, 'multiple' | 'field' | 'form'>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.length) {
        return;
      }
      if (multiple) {
        await setFieldValue(field.name, Array.from(event.target.files));
        return;
      }
      await setFieldValue(field.name, event.target.files[0]);
    },
    [field.name, multiple, setFieldValue],
  );

  return { inputRef, handleInputClick, handleChange };
};

export default useFileInput;
