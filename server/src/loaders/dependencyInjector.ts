import { Model, Sequelize } from "sequelize-typescript";
import { Container } from "typedi";
import LoggerInstance from "./logger";

export default ({
  db,
  models,
}: {
  db: Sequelize;
  models: { name: string; model: Model }[];
}) => {
  try {
    Container.set("logger", LoggerInstance);
    Container.set("db", db);

    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    return;
  } catch (err) {
    LoggerInstance.error("Error on dependency injector loader: %o", err);
    throw err;
  }
};
