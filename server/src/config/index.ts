import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    version: "/v1",
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  databaseUrl: process.env.DATABASE_URL,
  openapi: {
    scheme: process.env.OPENAPI_SCHEME,
    host: process.env.OPENAPI_HOST,
    port: process.env.OPENAPI_PORT || "",
  },
};
