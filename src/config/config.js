const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? "development"}`,
});

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: process.env.DBDIALECT,
    logging: false,
    define: {
      freezeTableName: true,
    },
  },
  JWT_SECRET_KEY,
};
