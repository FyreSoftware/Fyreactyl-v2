export interface IConfig {
  JWT: string;
  API: {
    PORT: number;
    DOMAIN: string;
  }
  CLIENT: {
    PORT: number;
    DOMAIN: string;
  }
  PTERODACTYL: {
    KEY: string;
    DOMAIN: string;
  }
}
