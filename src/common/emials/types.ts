export type EmailConfigSchema = {
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  EMAIL_ADAPTER: 'smtp';
};
