import "reflect-metadata";
import express from "express";
import config from "./config";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app
    .listen(config.port, "0.0.0.0", () => {
      Logger.info(`Server listening on port: ${config.port}`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
