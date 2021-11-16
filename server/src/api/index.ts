import { Router } from "express";
import auth from "./routes/auth";
import course from "./routes/course";
import study from "./routes/study";
import user from "./routes/user";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  study(app);
  course(app);
  return app;
};
