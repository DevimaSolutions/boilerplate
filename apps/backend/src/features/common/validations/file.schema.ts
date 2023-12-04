import { z } from 'zod';

type MulterFileStringFields = 'fieldname' | 'originalname' | 'encoding' | 'mimetype' | 'size';

const multerFileFieldTypes = {
  fieldname: 'string',
  originalname: 'string',
  encoding: 'string',
  mimetype: 'string',
  size: 'number',
};

export const fileSchema = z.custom<Express.Multer.File>((file) => {
  const castedFile = file as Express.Multer.File | undefined;

  return Object.entries(multerFileFieldTypes).every(
    ([field, fieldType]) => typeof castedFile?.[field as MulterFileStringFields] === fieldType,
  );
});
