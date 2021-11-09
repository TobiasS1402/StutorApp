import { Router } from "express";
import auth from "./routes/auth";
import hello from "./routes/hello";

export default () => {
  const app = Router();
  hello(app);
  auth(app);
  return app;
};
