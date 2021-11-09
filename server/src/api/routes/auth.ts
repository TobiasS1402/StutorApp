import { NextFunction, Request, Response, Router } from "express";
import { auth } from "express-openid-connect";
import Container from "typedi";
import AuthService from "../../service/auth";
import util from "../../util";

const route = Router();

export default (app: Router) => {
  app.use(auth());
  app.use("/auth", route);

  route.get(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        return await authServiceInstance.SignUp();
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
