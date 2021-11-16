import { celebrate, Joi } from "celebrate";
import { NextFunction, Response, Router, Request } from "express";
import Container from "typedi";
import { IUser } from "../../interfaces/IUser";
import UserService from "../../service/user";
import util from "../../util";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.put(
    "/pin",
    celebrate({
      body: Joi.object().keys({
        pin: Joi.string().required(),
      }),
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userServiceInstance = Container.get(UserService);
        await userServiceInstance.ChangePin(
          req.currentUser as IUser,
          req.body.pin
        );
        return res.status(200).json();
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
