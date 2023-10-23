export const EmailTemplate = {
  Welcome: 1,
  ForgotPassword: 2,
} as const;

export type EmailTemplate = typeof EmailTemplate;
