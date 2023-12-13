import { z } from 'zod';

export const fileSchema = z.custom<Blob>(
  (file) => {
    return file instanceof Blob;
  },
  { message: 'File is required.' },
);
