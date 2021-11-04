import { Model } from "sequelize-typescript";
import databaseLoader from "./database";
import expressLoader from "./express";
import modelLoader from "./model";
import setupLoader from "./setup";
import dependencyInjectorLoader from "./dependencyInjector";
import Logger from "./logger";
import fs from "fs";

export default async ({ expressApp }) => {
  const SequelizeInstance = await databaseLoader();
  Logger.info("Database loaded");

  const modelsList: { name: string; model: Model }[] = modelLoader();
  Logger.info("Loaded models list");

  dependencyInjectorLoader({ db: SequelizeInstance, models: modelsList });
  Logger.info("Dependency Injector loaded");

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");

  const setup = await setupLoader();
  if (setup) Logger.info("Loaded database setup (DEV ONLY)");
};
