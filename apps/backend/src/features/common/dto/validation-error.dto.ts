import { ErrorDto } from './error.dto';

export class ValidationErrorDto extends ErrorDto {
  errors: Record<string, string>;
}
