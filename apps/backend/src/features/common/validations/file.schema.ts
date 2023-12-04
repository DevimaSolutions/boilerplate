import { z } from 'zod';

import { fileConstants } from 'src/constants';

export const fileSchema = z.custom<Express.Multer.File>((file) => {
  const castedFile = file as Express.Multer.File | undefined;

  const hasStringFields = fileConstants.multerFileStringFields.every(
    (field) => typeof castedFile?.[field] === 'string',
  );
  return hasStringFields && typeof castedFile?.size === 'number';
});
