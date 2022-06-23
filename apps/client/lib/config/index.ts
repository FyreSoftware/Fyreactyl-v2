export interface IConfig {
  server_url: string
}
const config: IConfig = {
  server_url: process.env.SERVER_SIDE_URL,
};
export { config };
