import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import SurfOAuth2 from "../../config/OAuth2/SurfOAuth2";
import AuthService from "../../service/auth";
import util from "../../util";
import got from "got";
import { IUserInputDTO } from "../../interfaces/IUser";
import { celebrate, Joi } from "celebrate";
import middlewares from "../middlewares";
import messages from "../../messages";

const route = Router();
const oauth = SurfOAuth2;

export default (app: Router) => {
  app.use("/auth", route);

  route.get(
    "/login",
    async (_req: Request, res: Response, _next: NextFunction) => {
      var uri = oauth.code.getUri();
      res.redirect(uri);
    }
  );

  route.post(
    "/login",
    celebrate({
      body: Joi.object().keys({
        email: Joi.string().required(),
        pin: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignInPin(
          req.body as IUserInputDTO
        );
        return res.status(200).json({ user, token });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  route.get(
    "/callback",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await oauth.code.getToken(req.originalUrl);

        var request = user.sign({
          url: "https://connect.test.surfconext.nl/oidc/userinfo",
        });

        const data = await got(request.url, {
          headers: {
            Authorization: request["headers"]["Authorization"],
          },
        });

        const authServiceInstance = Container.get(AuthService);
        const userObj = JSON.parse(data.body);
        console.log(userObj);

        try {
          const { user, token } = await authServiceInstance.SignIn({
            email: userObj.email,
            language: userObj.schac_personal_unique_code[0].split(":")[3],
          } as IUserInputDTO);
          return res.status(200).json({ user, token });
        } catch (e) {
          const { user, token } = await authServiceInstance.SignUp({
            email: userObj.email,
            username: userObj.name,
            language: userObj.schac_personal_unique_code[0].split(":")[3],
          } as IUserInputDTO);
          return res.status(200).json({ user, token });
        }
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
