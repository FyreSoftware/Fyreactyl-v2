export interface IConfig {
  JWT: string;
  APP: {
    PORT: number;
    DOMAIN: string;
  }
  CLIENT: {
    DOMAIN: string;
  }
  PTERODACTYL: {
    KEY: string;
    DOMAIN: string;
  }
}
