import { ApiProperty } from '@nestjs/swagger';

import { getDtoFileFieldsMetadata } from '.';

describe('getDtoFileFieldsMetadata', () => {
  it('should return an empty array if dto is undefined', () => {
    const result = getDtoFileFieldsMetadata(undefined);
    expect(result).toEqual([]);
  });

  it('should return an empty array if dto has no fields', () => {
    class TestDto {}
    const result = getDtoFileFieldsMetadata(TestDto);
    expect(result).toEqual([]);
  });

  it('should return an empty array if dto has no api fields', () => {
    class TestDto {
      nonFileField: string;
    }
    const result = getDtoFileFieldsMetadata(TestDto);
    expect(result).toEqual([]);
  });

  it('should return an array of MulterField objects for file fields in the dto', () => {
    class TestDto {
      @ApiProperty({ type: 'file' })
      file: Express.Multer.File;

      @ApiProperty({ type: 'array', items: { type: 'file' } })
      files: Express.Multer.File[];
    }
    const result = getDtoFileFieldsMetadata(TestDto);
    expect(result).toEqual([{ name: 'file', maxCount: 1 }, { name: 'files' }]);
  });
});
