import { Type } from '@nestjs/common';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Checks if a value is a valid field metadata.
 * @param value - The value to check.
 * @returns True if the value is a valid field metadata, false otherwise.
 */
const isFieldMetadata = (value: unknown): value is ApiPropertyOptions =>
  typeof value === 'object' && value !== null && 'type' in value;

/**
 * Checks if the given field metadata represents a **Single** file field.
 * @param fieldMetadata - The field metadata to check.
 * @returns True if the field metadata represents a single file field, false otherwise.
 */
const isSingleFileField = (fieldMetadata: Pick<ApiPropertyOptions, 'type' | 'format'>) =>
  fieldMetadata.type === 'file' ||
  (fieldMetadata.type === 'string' && fieldMetadata.format === 'binary');

/**
 * Checks if the given field metadata represents a file field (either for a single or for multiple files).
 * @param fieldMetadata - The field metadata to check.
 * @returns True if the field is a file field, false otherwise.
 */
const isFileField = (fieldMetadata: ApiPropertyOptions) =>
  isSingleFileField(fieldMetadata) ||
  (fieldMetadata.type === 'array' &&
    fieldMetadata.items &&
    isSingleFileField(fieldMetadata.items as SchemaObject));

/**
 * Retrieves the **file** field names from the provided DTO type.
 * @param dto - The DTO type.
 * @returns An array of file field names.
 */
export const getFileFieldNames = <TDto>(dto: Type<TDto>) => {
  const swaggerFieldsDefinition: unknown = Reflect.getMetadata(
    'swagger/apiModelPropertiesArray',
    dto.prototype as object,
  );
  if (!Array.isArray(swaggerFieldsDefinition)) {
    return [];
  }

  // remove leading ':' from field name
  return swaggerFieldsDefinition.map((field) => String(field).replace(':', ''));
};

/**
 * Retrieves the MulterField options for file fields in a DTO.
 *
 * @param dto - The DTO class or undefined.
 * @returns  An array of MulterField objects representing the file fields metadata.
 */
export const getDtoFileFieldsMetadata = <TDto>(dto: Type<TDto> | undefined) => {
  if (!dto?.prototype) {
    // No api fields were found in the metadata
    // Cannot continue processing
    return [];
  }

  const fieldsMetadata: MulterField[] = [];
  for (const fieldName of getFileFieldNames(dto)) {
    // get field metadata from `@ApiProperty` decorator
    const fieldMetadata: unknown = Reflect.getMetadata(
      'swagger/apiModelProperties',
      dto.prototype as object,
      fieldName,
    );

    if (isFieldMetadata(fieldMetadata) && isFileField(fieldMetadata)) {
      fieldsMetadata.push(
        fieldMetadata.type === 'array' ? { name: fieldName } : { name: fieldName, maxCount: 1 },
      );
    }
  }
  return fieldsMetadata;
};
