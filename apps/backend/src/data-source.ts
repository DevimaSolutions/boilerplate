import 'reflect-metadata';
import { config as configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import envConfig from './config/env.config';

configDotenv();
const { database } = envConfig();

// This data source is used by TypeORM cli
// eg. to run and generate migrations
export const AppDataSource = new DataSource({
  ...database,
  type: 'postgres',
  synchronize: false,
  logging: true,
  entities: [`${__dirname}/**/*.entity.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  migrationsTransactionMode: 'each',
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
});
