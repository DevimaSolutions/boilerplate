import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Inject, Injectable } from '@nestjs/common';

import envConfig from 'src/config/env.config';

import { FileUploadService } from './base-file-upload.service';

import type { PutObjectCommandInput, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class S3FileUploadService extends FileUploadService {
  private readonly s3: S3;

  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {
    super();
    this.s3 = new S3({ apiVersion: '2006-03-01' });
  }

  private uploadToS3 = async (params: PutObjectCommandInput) => {
    const uploadAction = new Upload({
      client: this.s3,
      params,
    });
    await uploadAction.done();

    const uploadLocation = `${this.config.aws.cdnDomain}/${params.Key}`;
    return uploadLocation;
  };

  private getCommonParams(file: Express.Multer.File) {
    return {
      Bucket: this.config.aws.bucketName,
      ContentType: file.mimetype,
    };
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    return this.uploadToS3({
      ...this.getCommonParams(file),
      Body: file.buffer,
      Key: this.getFileKey(file, path),
    });
  }

  removeFile = async (fileKey: string) => {
    const requestParams: DeleteObjectCommandInput = {
      Bucket: this.config.aws.bucketName,
      Key: fileKey,
    };

    const data = await this.s3.deleteObject(requestParams);
    return data.DeleteMarker ?? false;
  };

  async removeFiles(fileKeys: string[]) {
    const res = await this.s3.deleteObjects({
      Bucket: this.config.aws.bucketName,
      Delete: {
        Objects: fileKeys.map((fileKey) => ({ Key: fileKey })),
      },
    });

    if (!res.Deleted) {
      throw new Error('Something went wrong while deleting files');
    }

    return res.Deleted.map((deleted) => deleted.DeleteMarker ?? false);
  }

  async doesFileExist(fileKey: string) {
    try {
      await this.s3.headObject({ Bucket: this.config.aws.bucketName, Key: fileKey });
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }
}
