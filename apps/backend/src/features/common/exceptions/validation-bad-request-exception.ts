import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

export class ValidationBadRequestException extends BadRequestException {
  constructor(error: ZodError, message = 'Validation Failed', description = 'Bad Request') {
    super(ValidationBadRequestException.createValidationResponse(error, message, description));
  }

  private static createValidationResult(error: ZodError) {
    const result: Record<string, string> = {};

    for (const x of error.errors) {
      result[x.path.filter(Boolean).join('.')] = x.message;
    }

    return result;
  }

  // Transform error data into the object where
  // the key is field name and value is an error.
  // Fields that do not have an error are omitted
  private static createValidationResponse = (
    error: ZodError,
    message: string,
    description: string,
  ) => {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error: description,
      errors: this.createValidationResult(error),
    };
  };
}
