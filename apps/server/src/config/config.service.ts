import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IConfig } from './interfaces/config.interface';

dotenv.config({ path: '../../../../.env' });
@Injectable()
export class ConfigService {
  getConfig = (): IConfig => ({
    JWT: process.env.JWT_SECRET,
    API: {
      PORT: Number(process.env.API_PORT),
      DOMAIN: process.env.API_DOMAIN,
    },
    CLIENT: {
      PORT: Number(process.env.CLIENT_PORT),
      DOMAIN: process.env.CLIENT_DOMAIN,
    },
    PTERODACTYL: {
      KEY: process.env.PTERODACTYL_KEY,
      DOMAIN: process.env.PTERODACTYL_DOMAIN,
    },
  });

  getConfigValue(value: string): string | undefined | null {
    return this.getConfig()[value];
  }
}
