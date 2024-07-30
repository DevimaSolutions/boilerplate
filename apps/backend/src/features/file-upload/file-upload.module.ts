import { DynamicModule, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

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
  private static ensureModuleOptions(
    options?: FileUploadModuleOptions,
    config?: ConfigType<typeof envConfig>,
  ) {
    const awsConfig = config?.aws ?? envConfig().aws;

    const shouldUseAwsStorage = process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_ACCESS_KEY_ID;

    const ensureOptions = {
      type: shouldUseAwsStorage ? 'aws' : 'local',
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
          inject: [envConfig.KEY],
          useFactory: (config: ConfigType<typeof envConfig>) => {
            const ensureOptions = FileUploadModule.ensureModuleOptions(options, config);
            return ensureOptions.type === 'aws'
              ? new S3FileUploadService(config)
              : new LocalFileUploadService(config);
          },
        },
      ],
      exports: [FileUploadService],
    };
  }
}
