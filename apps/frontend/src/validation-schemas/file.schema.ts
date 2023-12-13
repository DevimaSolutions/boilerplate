import { z } from 'zod';

export const fileSchema = z.custom<File>(
  (file) => {
    return file instanceof File;
  },
  { message: 'File is required.' },
);
