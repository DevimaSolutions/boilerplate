import { z } from 'zod';

const multerFileFieldTypes = {
  fieldname: 'string',
  originalname: 'string',
  encoding: 'string',
  mimetype: 'string',
  size: 'number',
} as const;

type MulterFileStringFields = keyof typeof multerFileFieldTypes;

export const fileSchema = z.custom<Express.Multer.File>((file) => {
  const castedFile = file as Express.Multer.File | undefined;
  return Object.entries(multerFileFieldTypes).every(
    ([field, fieldType]) => typeof castedFile?.[field as MulterFileStringFields] === fieldType,
  );
});
