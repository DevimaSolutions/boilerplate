import { Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { stringify } from 'qs';

import envConfig from '../../config/env.config';
import { ValueOf } from '../common/types';

import { EmailTemplate } from './enums';
import { EmailParams, WelcomeEmailParams } from './interfaces';

@Injectable()
export abstract class MailingService {
  private configuration: ConfigType<typeof envConfig>;

  constructor(config: ConfigType<typeof envConfig>) {
    this.configuration = config;
  }

  abstract sendEmail<TEmailType extends ValueOf<EmailTemplate>>(
    recipient: string,
    templateId: TEmailType,
    params: EmailParams<TEmailType>,
  ): Promise<void> | Promise<string>;

  async sendForgotPasswordEmail(recipient: string, token: string) {
    await this.sendEmail(recipient, EmailTemplate.ForgotPassword, {
      resetLink: `${this.configuration.frontendHostUrl}/reset-password?${stringify({ token })}`,
    });
  }

  async sendWelcomeEmail(recipient: string, data: WelcomeEmailParams) {
    await this.sendEmail(recipient, EmailTemplate.Welcome, data);
  }

  static getTemplateTitle: Record<ValueOf<EmailTemplate>, string> = {
    [EmailTemplate.ForgotPassword]: 'Reset password',
    [EmailTemplate.Welcome]: 'Welcome',
  };
}
