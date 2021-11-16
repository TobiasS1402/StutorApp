import { Router } from "express";
import auth from "./routes/auth";
import study from "./routes/study";
import user from "./routes/user";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  study(app);
  return app;
};
