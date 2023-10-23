import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from '../../config/env.config';

import { BrevoService } from './brevo.service';
import { EmailTemplatesRepository } from './email-templates.repository';
import { EmailTemplate } from './entities';
import { MailhogService } from './mailhog.service';
import { MailingService } from './mailing.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplate])],
  providers: [
    EmailTemplatesRepository,
    {
      provide: MailingService,
      useFactory: (
        config: ConfigType<typeof envConfig>,
        emailTemplatesRepository: EmailTemplatesRepository,
      ) => {
        return config.mailhog.host && config.mailhog.port
          ? new MailhogService(config)
          : new BrevoService(config, emailTemplatesRepository);
      },
      inject: [
        { token: envConfig.KEY, optional: false },
        { token: EmailTemplatesRepository, optional: false },
      ],
    },
  ],
  exports: [MailingService],
})
export class MailingModule {}
