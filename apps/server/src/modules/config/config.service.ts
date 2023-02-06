import * as dotenv from "dotenv";
import * as fs from "fs";
import { IConfig } from "./interfaces/config.interface";

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;

  constructor() {
    this.envConfig = dotenv.config({
      path: "../../.env",
    }).parsed;
  }
  getConfig = (): IConfig => ({
    JWT: process.env.JWT_SECRET_KEY,
    APP: {
      PORT: Number(process.env.APP_PORT),
      DOMAIN: process.env.APP_URL,
    },
    CLIENT: {
      DOMAIN: process.env.FRONTEND_URL,
    },
    PTERODACTYL: {
      KEY: process.env.PTERODACTYL_KEY,
      DOMAIN: process.env.PTERODACTYL_DOMAIN,
    },
  });

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
