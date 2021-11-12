import { Application } from "express";
import cors from "cors";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import config from "../config";
import routes from "../api";
import path from "path";

export default ({ app }: { app: Application }) => {
  app.get("/status", (_req, res) => {
    res.status(200).end();
  });
  app.head("/staus", (_req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors());

  app.use(methodOverride());

  app.use(bodyParser.json());
  app.use(config.api.version, routes());

  app.use((err, _req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
