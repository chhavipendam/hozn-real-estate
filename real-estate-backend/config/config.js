// Sequelize CLI config (used for `sequelize-cli db:migrate`, etc.)
// Reads everything from environment variables instead of hardcoded values.
// See ../.env.example for the variables you need to set.
require("dotenv").config();

const common = {
  dialect: "postgres",
};

const productionSsl = {
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
};

module.exports = {
  development: {
    ...common,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "real_estate_db",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
  },
  test: {
    ...common,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME_TEST || "real_estate_db_test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
  },
  production: {
    ...common,
    // Prefer a single DATABASE_URL (this is what Render/Railway give you)
    use_env_variable: process.env.DATABASE_URL ? "DATABASE_URL" : undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    ...productionSsl,
  },
};
