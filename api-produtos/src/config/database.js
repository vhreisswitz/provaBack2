require("dotenv").config({ quiet: true });

const config = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "senai",
  database: process.env.DB_NAME || "lojaprodutos",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 5433,
  dialect: "postgres",
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
