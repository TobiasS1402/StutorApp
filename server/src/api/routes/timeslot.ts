import { NextFunction, Request, Response, Router } from "express";
import { CustomError } from "../../errors";
import middlewares from "../middlewares";
import responses from "../../errors/responses.json";
import Container from "typedi";
import TimeslotService from "../../service/timeslot";
import { ITimeslotInputDTO } from "../../interfaces/ITimeslot";
import util from "../../util";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/timeslots", route);

  /**
   * Get one timeslot from the given url id
   */
  route.get(
    "/:_id",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (isNaN(Number(req.params._id)))
          throw new CustomError(responses.TIMESLOT_ID_INVALID);

        const timeslotServiceInstance = Container.get(TimeslotService);
        const input: Partial<ITimeslotInputDTO> = {
          _id: parseInt(req.params._id),
        };
        const { timeslot } = await timeslotServiceInstance.GetTimeslotById(
          input
        );
        return res.status(200).json({ timeslot });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  /**
   * Get Timeslots from given url id
   */
  route.get(
    "/lesson/:_id",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (isNaN(Number(req.params._id)))
          throw new CustomError(responses.LESSON_ID_INVALID);

        const timeslotServiceInstance = Container.get(TimeslotService);
        const input: Partial<ITimeslotInputDTO> = {
          lessonId: parseInt(req.params._id),
        };
        const { timeslots } =
          await timeslotServiceInstance.GetWeekTimeslotsForLesson(input);
        return res.status(200).json({ timeslots });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  /**
   * Create a new Timeslot in the database with a lessonId, startDate and endDate
   */
  route.post(
    "/lesson/:_id",
    middlewares.isAuth,
    celebrate({
      body: Joi.object().keys({
        startdate: Joi.date().required(),
        enddate: Joi.date().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (isNaN(Number(req.params._id)))
          throw new CustomError(responses.LESSON_ID_INVALID);

        const timeslotServiceInstance = Container.get(TimeslotService);
        const input: ITimeslotInputDTO = {
          lessonId: parseInt(req.params._id),
          startdate: req.body.startdate,
          enddate: req.body.enddate,
        };

        const timeslot = await timeslotServiceInstance.CreateTimeslot(input);
        return res.status(200).json({ timeslot });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
