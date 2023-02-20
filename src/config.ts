import dotenv from "dotenv";
dotenv.config();

export default {
  env: process.env.ENV || process.env.NODE_ENV,
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 4000,
  dbUrl: process.env.DATABASE_URL,
  authJwtSecret: process.env.AUTH_JWT_SECRET || "SUPERSECRET",
};
