import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Inject, Injectable } from '@nestjs/common';

import envConfig from 'src/config/env.config';

import type { PutObjectCommandInput, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AwsService {
  private readonly s3: S3;

  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {
    this.s3 = new S3({ apiVersion: '2006-03-01' });
  }

  private uploadToS3 = async (params: PutObjectCommandInput) => {
    const uploadAction = new Upload({
      client: this.s3,
      params,
    });
    await uploadAction.done();

    const uploadLocation = `https://${params.Bucket}.s3${this.config.aws.region}.amazonaws.com/${params.Key}`;
    return uploadLocation;
  };

  private removeFile = async (key: string) => {
    const requestParams: DeleteObjectCommandInput = {
      Bucket: this.config.aws.bucketName,
      Key: key,
    };

    const data = await this.s3.deleteObject(requestParams);
    return data.DeleteMarker ?? false;
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
