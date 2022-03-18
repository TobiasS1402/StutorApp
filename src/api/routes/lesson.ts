import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { CustomError } from "../../errors";
import util from "../../util";
import middlewares from "../middlewares";
import responses from "../../errors/responses.json";
import LessonService from "../../service/lesson";
import { ILessonInputDTO } from "../../interfaces/ILesson";

const route = Router();

export default (app: Router) => {
  app.use("/lessons", route);

  route.get(
    "/course/:_id",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (isNaN(Number(req.params._id)))
          throw new CustomError(responses.COURSE_ID_INVALID);

        const lessonServiceInstance = Container.get(LessonService);
        const input: Partial<ILessonInputDTO> = {
          _id: parseInt(req.params._id),
        };
        const { lessons } = await lessonServiceInstance.GetAllLessonsByCourse(
          input
        );
        return res.status(200).json({ lessons });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  route.get(
    "/:_id",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (isNaN(Number(req.params._id)))
          throw new CustomError(responses.LESSON_NOT_FOUND);

        const lessonServiceInstance = Container.get(LessonService);
        const input: Partial<ILessonInputDTO> = {
          _id: parseInt(req.params._id),
        };
        const { lesson } = await lessonServiceInstance.GetLessonById(input);
        return res.status(200).json({ lesson });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
