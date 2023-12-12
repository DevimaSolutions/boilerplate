import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

export interface FileUploadOption {
  file: Express.Multer.File;
  path: string;
}

@Injectable()
export abstract class FileUploadService {
  getFileKeyFromUri(fileUri: string) {
    return new URL(fileUri).pathname.substring(1);
  }

  getFileName(file: Express.Multer.File) {
    return file.originalname
      .split('.')
      .map((part) => slugify(part))
      .join('.');
  }

  getFileKey(file: Express.Multer.File, path: string) {
    const fileName = this.getFileName(file);
    return `${path}${fileName}`;
  }

  abstract uploadFile(file: Express.Multer.File, path: string): Promise<string>;
  abstract removeFile(fileKey: string): Promise<boolean>;

  uploadFiles(options: FileUploadOption[]) {
    return Promise.all(options.map((option) => this.uploadFile(option.file, option.path)));
  }
  removeFiles(fileKeys: string[]) {
    return Promise.all(fileKeys.map((fileKey) => this.removeFile(fileKey)));
  }

  abstract doesFileExist(fileKey: string): Promise<boolean>;
}
