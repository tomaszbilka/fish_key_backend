import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { match, P } from 'ts-pattern';
import { EmailAdapter } from '../adapters/email.adapter';
import { SmtpAdapter } from '../adapters/smtp.adapter';
import { ModuleRef } from '@nestjs/core';
import { EmailConfigSchema } from '../types';

type AdapterType = EmailConfigSchema['EMAIL_ADAPTER'];

@Injectable()
export class EmailAdapterFactory {
  constructor(
    private moduleRef: ModuleRef,
    private configService: ConfigService,
  ) {}

  async createAdapter(): Promise<EmailAdapter> {
    const adapterType = this.configService.get<AdapterType>('EMAIL_ADAPTER');
    const adapter = match(adapterType)
      .with('smtp', () => SmtpAdapter)
      .with(P.nullish, () => {
        throw new Error('EMAIL_ADAPTER is not defined in configuration');
      })
      .otherwise((type) => {
        throw new Error(`Unknown email adapter type: ${type}`);
      });

    return await this.moduleRef.create<EmailAdapter>(adapter);
  }
}
