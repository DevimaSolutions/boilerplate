import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import envConfig from './env.config';

const inMemoryModuleOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [], // Do not load any entities, since some model features are not supported by sqlite
  synchronize: true,
  logging: false,
};

const typeOrmDefaultModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode: 'each',
  ...envConfig().database,
};

/**
 * Options for the TypeORM module.
 * If the current environment is 'api-client', it uses in-memory module options.
 * Otherwise, it uses the default TypeORM module options.
 */
export const typeOrmModuleOptions = ['api-client'].includes(process.env.NODE_ENV)
  ? inMemoryModuleOptions
  : typeOrmDefaultModuleOptions;
