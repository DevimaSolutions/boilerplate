import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmModuleOptions } from 'src/config/db.config';
import envConfig from 'src/config/env.config';
import { AuthModule } from 'src/features/auth/auth.module';
import { AwsModule } from 'src/features/aws';
import { MailingModule } from 'src/features/mailing/mailing.module';
import { UsersModule } from 'src/features/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      cache: true,
      isGlobal: true,
    }),
    // TODO: test if this works with Nginx https://docs.nestjs.com/security/rate-limiting#proxies
    ThrottlerModule.forRoot({
      throttlers: [
        {
          // 20 requests per 10 seconds to protected endpoints
          ttl: 10000,
          limit: 20,
        },
      ],
    }),
    TypeOrmModule.forRoot(getTypeOrmModuleOptions()),
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
