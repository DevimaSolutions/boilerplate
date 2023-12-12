import fs from 'node:fs/promises';
import nodePath from 'node:path';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import envConfig from 'src/config/env.config';

import { FileUploadService } from './base-file-upload.service';

@Injectable()
export class LocalFileUploadService extends FileUploadService {
  static FILE_UPLOAD_PATH = '/uploads';

  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {
    super();
  }

  getFilePath(fileKey: string) {
    return nodePath.join(process.cwd(), LocalFileUploadService.FILE_UPLOAD_PATH, fileKey);
  }

  getFileKeyFromUri(fileUri: string) {
    // remove part of the pathname (/api/uploads) from the file uri
    return new URL(fileUri).pathname.split('/').slice(3).join('/');
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    const fileKey = this.getFileKey(file, path);
    const filePath = this.getFilePath(fileKey);
    const fileDir = nodePath.join(process.cwd(), LocalFileUploadService.FILE_UPLOAD_PATH, path);

    // recursively create directory if  it does not exist
    await fs.mkdir(fileDir, { recursive: true });

    await fs.writeFile(filePath, file.buffer);

    const uploadLocation = `${this.config.frontendHostUrl}${this.config.frontendProxyPath}${LocalFileUploadService.FILE_UPLOAD_PATH}/${fileKey}`;
    return uploadLocation;
  }
  async removeFile(fileKey: string) {
    try {
      await fs.unlink(
        nodePath.join(process.cwd(), LocalFileUploadService.FILE_UPLOAD_PATH, fileKey),
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async doesFileExist(fileKey: string) {
    try {
      const res = await fs.stat(
        nodePath.join(process.cwd(), LocalFileUploadService.FILE_UPLOAD_PATH, fileKey),
      );
      return res.isFile();
    } catch (error) {
      return false;
    }
  }
}
