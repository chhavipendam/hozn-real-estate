import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

// All connection details come from environment variables — never hardcode
// real credentials in source. See .env.example for the variables you need.
// Many managed Postgres hosts (Render, Railway, etc.) also give you a single
// DATABASE_URL instead of separate host/user/password — support both.
const isProduction = process.env.NODE_ENV === "production";

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      models: [User],
      dialectOptions: isProduction
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
      logging: false,
    })
  : new Sequelize({
      database: process.env.DB_NAME || "real_estate_db",
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      dialect: "postgres",
      models: [User],
      dialectOptions: isProduction
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
      logging: false,
    });
