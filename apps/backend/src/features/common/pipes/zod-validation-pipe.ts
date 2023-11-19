import { PipeTransform, Injectable } from '@nestjs/common';
import { ParseParams, ZodError, ZodObject, ZodRawShape } from 'zod';

import { ValidationBadRequestException } from '../exceptions';

@Injectable()
export class ZodValidationPipe<T extends ZodRawShape> implements PipeTransform {
  constructor(
    private schema: ZodObject<T>,
    private options?: Partial<ParseParams>,
  ) {}

  async transform(value: T) {
    try {
      const result = await this.schema.parseAsync(value, this.options);
      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationBadRequestException(error, 'Validation failed');
      }
      throw error;
    }
  }
}
