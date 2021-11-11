import { NextFunction, Request, Response, Router } from "express";
import { auth, requiresAuth } from "express-openid-connect";
import Container from "typedi";
import AuthService from "../../service/auth";
import util from "../../util";

const route = Router();

export default (app: Router) => {
  app.use(
    auth({
      authRequired: false,
    })
  );
  app.use("/auth", route);

  route.get(
    "/signup",
    requiresAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        return await authServiceInstance.SignUp();
      } catch (e) {
        console.log(e);

        return util.handleCustomError(e, res, next);
      }
    }
  );

  route.post(
    "/callback",
    async (req: Request, res: Response, next: NextFunction) => {
      res.send(`hello!\n\n${req.oidc.user}`);
    }
  );
};
