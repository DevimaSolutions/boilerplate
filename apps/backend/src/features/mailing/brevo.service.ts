import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import envConfig from '../../config/env.config';

import { EmailTemplatesRepository } from './email-templates.repository';
import { EmailTemplateValues } from './enums';
import { EmailParams } from './interfaces';
import { MailingService } from './mailing.service';

@Injectable()
export class BrevoService extends MailingService {
  private brevoEmailHost: string;
  private headers: Record<string, string>;

  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
    private emailTemplatesRepository: EmailTemplatesRepository,
  ) {
    super(config);

    this.brevoEmailHost = `${this.config.brevo.host}/smtp/email`;
    this.headers = {
      accept: 'application/json',
      'api-key': this.config.brevo.apiKey,
      'content-type': 'application/json',
    };
  }

  async sendEmail<TEmailType extends EmailTemplateValues>(
    recipient: string,
    templateId: TEmailType,
    params: EmailParams<TEmailType>,
  ) {
    const emailTemplate = await this.emailTemplatesRepository.findOneBy({ templateId });

    if (!this.config.brevo.host || !this.config.brevo.apiKey || !emailTemplate) {
      throw new InternalServerErrorException();
    }

    const options: Record<string, unknown> = {
      to: [{ email: recipient }],
      templateId,
      params,
    };

    const res = await fetch(this.brevoEmailHost, {
      method: 'POST',
      body: JSON.stringify(options),
      headers: this.headers,
    });

    const data = (await res.json()) as { messageId: string };

    return data.messageId;
  }
}
