import { DynamicModule, Module } from '@nestjs/common';

import envConfig from 'src/config/env.config';
import { ServeLocalFilesController } from 'src/features/file-upload/serve-local-files.controller';

import { FileUploadService } from './base-file-upload.service';
import { LocalFileUploadService } from './local-file-upload-service.service';
import { S3FileUploadService } from './s3-file-upload.service';

export interface FileUploadModuleOptions {
  type?: 'aws' | 'local';
}

@Module({})
export class FileUploadModule {
  private static ensureModuleOptions(options?: FileUploadModuleOptions) {
    const awsConfig = envConfig().aws;

    const ensureOptions = {
      type: awsConfig.secretAccessKey && awsConfig.accessKeyId ? 'aws' : 'local',
      ...options,
    };

    if (
      ensureOptions.type === 'aws' &&
      (!awsConfig.accessKeyId ||
        !awsConfig.secretAccessKey ||
        !awsConfig.bucketName ||
        !awsConfig.region)
    ) {
      throw new Error('Missing AWS configuration. Please check the .env file.');
    }
    return ensureOptions;
  }

  static forRoot(options?: FileUploadModuleOptions): DynamicModule {
    const ensureOptions = FileUploadModule.ensureModuleOptions(options);
    return {
      module: FileUploadModule,
      controllers:
        ensureOptions.type === 'aws'
          ? []
          : // Files uploaded locally will be statically hosted by server so they can be accessed
            [ServeLocalFilesController],
      providers: [LocalFileUploadService],
    };
  }
  static forFeature(options?: FileUploadModuleOptions): DynamicModule {
    const ensureOptions = FileUploadModule.ensureModuleOptions(options);

    return {
      module: FileUploadModule,
      providers: [
        {
          provide: FileUploadService,
          useClass: ensureOptions.type === 'aws' ? S3FileUploadService : LocalFileUploadService,
        },
      ],
      exports: [FileUploadService],
    };
  }
}
