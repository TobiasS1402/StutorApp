import { celebrate, Joi } from "celebrate";
import { NextFunction, Response, Router, Request, response } from "express";
import Container from "typedi";
import { IUser, IUserInputDTO } from "../../interfaces/IUser";
import StudyService from "../../service/study";
import UserService from "../../service/user";
import util from "../../util";
import middlewares from "../middlewares";
import { ITimeslotInputDTO } from "../../interfaces/ITimeslot";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  /**
   * Authenticate current user
   */
  route.get(
    "/me",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, _next: NextFunction) => {
      return res.status(200).json({ user: req.currentUser });
    }
  );

  /**
   * First authenticate current user
   * Second check of requested study exist
   * Third update something in User needs to dig deeper for that one!!!
   */
  route.put(
    "/",
    celebrate({
      body: Joi.object().keys({
        studyId: Joi.number(),
        year: Joi.number(),
        description: Joi.string(),
        avatar: Joi.string(),
      }),
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Validate if study is existing
        if (req.body.studyId) {
          const studyServiceInstance = Container.get(StudyService);
          await studyServiceInstance.GetStudyById({
            _id: req.body.studyId,
          } as ITimeslotInputDTO);
        }

        let input: IUserInputDTO = {
          ...(req.body as IUserInputDTO),
          email: req.currentUser.email,
        };

        const userServiceInstance = Container.get(UserService);
        await userServiceInstance.ChangeUser(input);
        return res.status(200).json();
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  /**
   * First authenticate current user
   * Second give the current user a new encrypted pin in the database
   */
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
