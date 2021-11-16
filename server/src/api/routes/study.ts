import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { Logger as _Logger } from "winston";
import { IStudyInputDTO } from "../../interfaces/IStudy";
import StudyService from "../../service/study";
import util from "../../util";
import { CustomError } from "../../errors";
import responses from "../../errors/responses.json";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/studies", route);

  route.get(
    "/",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const studyServiceInstance = Container.get(StudyService);
        const { studies } = await studyServiceInstance.GetAllStudies();
        return res.status(200).json({ studies });
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
          throw new CustomError(responses.STUDY_ID_INVALID);

        const studyServiceInstance = Container.get(StudyService);
        const input: Partial<IStudyInputDTO> = {
          _id: parseInt(req.params._id),
        };
        const { study } = await studyServiceInstance.GetStudyById(input);
        return res.status(200).json({ study });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
