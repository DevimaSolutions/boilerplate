import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import envConfig from '../../config/env.config';

import type {
  ManagedUpload,
  PutObjectRequest,
  DeleteObjectRequest,
  DeleteObjectOutput,
} from 'aws-sdk/clients/s3';

@Injectable()
export class AwsService {
  private readonly s3: S3;

  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {
    this.s3 = new S3({ apiVersion: '2006-03-01' });
  }

  private uploadToS3 = (params: PutObjectRequest) => {
    return new Promise<string>((resolve, reject) => {
      this.s3.upload(params, (err: Error | null, data: ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        }

        resolve(data.Location);
      });
    });
  };

  private removeFile = async (key: string) => {
    const requestParams: DeleteObjectRequest = {
      Bucket: this.config.aws.bucketName,
      Key: key,
    };

    return new Promise<boolean>((resolve, reject) => {
      this.s3.deleteObject(requestParams, (err: Error | null, data: DeleteObjectOutput) => {
        if (err) {
          reject(err);
        }

        resolve(data.DeleteMarker ? data.DeleteMarker : false);
      });
    });
  };

  private getFileName(file: Express.Multer.File) {
    return file.originalname;
  }

  private getFileKey(file: Express.Multer.File, folder: string) {
    const fileName = this.getFileName(file);
    return `${folder}${fileName}`;
  }

  private getCommonParams(file: Express.Multer.File) {
    return {
      Bucket: this.config.aws.bucketName,
      ContentType: file.mimetype,
    };
  }

  uploadImage(image: Express.Multer.File, folder: string) {
    return this.uploadToS3({
      ...this.getCommonParams(image),
      Body: image.buffer,
      Key: this.getFileKey(image, folder),
    });
  }

  removeImage(key: string) {
    return this.removeFile(key);
  }
}
