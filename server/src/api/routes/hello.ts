import { NextFunction, Request, Response, Router } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/hello_world", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "Hello world!", code: 1 }).status(200);
  });
};
