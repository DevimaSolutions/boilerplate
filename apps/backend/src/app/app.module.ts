import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import envConfig from '../config/env.config';
import { AuthModule } from '../features/auth/auth.module';
import { AwsModule } from '../features/aws';
import { MailingModule } from '../features/mailing/mailing.module';
import { UsersModule } from '../features/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      migrations: [`${__dirname}/migrations/*.{ts,js}`],
      namingStrategy: new SnakeNamingStrategy(),
      migrationsTransactionMode: 'each',
      ...envConfig().database,
    }),
    AwsModule,
    AuthModule,
    UsersModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
