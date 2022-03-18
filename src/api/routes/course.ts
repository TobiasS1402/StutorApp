import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { CustomError } from "../../errors";
import CourseService from "../../service/course";
import util from "../../util";
import middlewares from "../middlewares";
import responses from "../../errors/responses.json";
import { ICourseInputDTO } from "../../interfaces/ICourse";

const route = Router();

export default (app: Router) => {
  app.use("/courses", route);

  route.get(
    "/",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courseServiceInstance = Container.get(CourseService);
        const { courses } = await courseServiceInstance.GetAllCourses();
        return res.status(200).json({ courses });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  route.get(
    "/study/:_id",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (isNaN(Number(req.params._id)))
          throw new CustomError(responses.STUDY_ID_INVALID);

        const courseServiceInstance = Container.get(CourseService);
        const input: Partial<ICourseInputDTO> = {
          _id: parseInt(req.params._id),
        };
        const { courses } = await courseServiceInstance.GetAllCoursesByStudy(
          input
        );
        return res.status(200).json({ courses });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
