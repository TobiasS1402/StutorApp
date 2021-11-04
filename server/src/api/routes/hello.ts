import { NextFunction, Request, Response, Router } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/hello", route);

  route.get(
    "/world",
    async (req: Request, res: Response, next: NextFunction) => {
      return res.json({ hello: "world" }).status(200);
    }
  );
};
