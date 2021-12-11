import { Application } from "express";
import options from "../config/openapi";
import redoc from "redoc-express";

export default ({ app }: { app: Application }): boolean => {
  app.get("/docs/openapi.json", (req, res) => {
    res.send(options);
  });

  app.get("/docs", redoc({ title: "API Docs", specUrl: "/docs/openapi/json" }));
  return true;
};
