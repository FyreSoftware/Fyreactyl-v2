const dotenv = require("dotenv");

dotenv.config();

const { DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } =
  process.env;

module.exports = {
  type: "mongodb",
  url: DB_HOST,
  entities: [__dirname + "/src/**/*.entity.{ts,js}"],
};
