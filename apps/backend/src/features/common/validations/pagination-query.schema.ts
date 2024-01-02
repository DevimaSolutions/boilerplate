import { ZodType, z } from 'zod';

const stringToNumberSchema = () =>
  z.string().transform((val) => {
    const numericValue = parseInt(val, 10);
    if (isNaN(numericValue) || numericValue < 0) {
      return undefined;
    }

    return numericValue;
  });

const safePreprocessor =
  <O, Z extends ZodType<O>>(preprocessorSchema: Z) =>
  (val: unknown): O | undefined => {
    const parsed = preprocessorSchema.safeParse(val);
    if (!parsed.success) {
      return undefined;
    }
    return parsed.data;
  };

export const paginationQuerySchema = z.object({
  limit: z.preprocess(safePreprocessor(stringToNumberSchema()), z.number().default(10)),
  offset: z.preprocess(safePreprocessor(stringToNumberSchema()), z.number().default(0)),
});
