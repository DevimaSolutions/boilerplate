import { Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { stringify } from 'qs';

import envConfig from 'src/config/env.config';

import { EmailTemplate, EmailTemplateValues } from './enums';
import { EmailParams } from './interfaces';

@Injectable()
export abstract class MailingService {
  private configuration: ConfigType<typeof envConfig>;

  constructor(config: ConfigType<typeof envConfig>) {
    this.configuration = config;
  }

  abstract sendEmail<TEmailType extends EmailTemplateValues>(
    recipient: string,
    templateId: TEmailType,
    params: EmailParams<TEmailType>,
  ): Promise<void> | Promise<string>;

  async sendForgotPasswordEmail(recipient: string, token: string) {
    await this.sendEmail(recipient, EmailTemplate.ForgotPassword, {
      resetLink: `${this.configuration.frontendHostUrl}/reset-password?${stringify({ token })}`,
    });
  }

  async sendConfirmationEmail(recipient: string, username: string, token: string) {
    await this.sendEmail(recipient, EmailTemplate.ConfirmEmail, {
      username,
      confirmationLink: `${this.configuration.frontendHostUrl}/confirm-email?${stringify({
        token,
      })}`,
    });
  }

  static getTemplateTitle: Record<EmailTemplateValues, string> = {
    [EmailTemplate.ForgotPassword]: 'Reset password',
    [EmailTemplate.ConfirmEmail]: 'Welcome',
  };
}
