import { ValueOf } from '../../common/types';

import type { EmailTemplate } from '../enums';

export interface WelcomeEmailParams {
  username: string;
}

export interface ResetPasswordEmailParams {
  resetLink: string;
}

export type EmailParams<TEmailType extends ValueOf<EmailTemplate>> =
  TEmailType extends EmailTemplate['ForgotPassword']
    ? ResetPasswordEmailParams
    : TEmailType extends EmailTemplate['Welcome']
    ? WelcomeEmailParams
    : never;
