import type { EmailTemplate, EmailTemplateValues } from '../enums';

export interface WelcomeEmailParams {
  username: string;
  confirmationLink: string;
}

export interface ResetPasswordEmailParams {
  resetLink: string;
}

export type EmailParams<TEmailType extends EmailTemplateValues> =
  TEmailType extends EmailTemplate['ForgotPassword']
    ? ResetPasswordEmailParams
    : TEmailType extends EmailTemplate['ConfirmEmail']
    ? WelcomeEmailParams
    : never;
