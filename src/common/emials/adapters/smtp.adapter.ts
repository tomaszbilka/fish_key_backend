import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Email } from '../email.interface';
import { EmailAdapter } from './email.adapter';

@Injectable()
export class SmtpAdapter extends EmailAdapter {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    super();
    const config = this.getNodemailerOptions();
    this.transporter = nodemailer.createTransport(config);
  }

  private getNodemailerOptions() {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASSWORD');

    if (!host || !port || !user || !pass) {
      throw new Error('Missing SMTP configuration');
    }

    return {
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    };
  }

  async sendMail(email: Email): Promise<void> {
    await this.transporter.sendMail(email);
  }
}
