import { Router } from "express";
import appointments from "./routes/appointments";
import auth from "./routes/auth";
import course from "./routes/course";
import lesson from "./routes/lesson";
import study from "./routes/study";
import user from "./routes/user";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  study(app);
  course(app);
  lesson(app);
  appointments(app);
  return app;
};
