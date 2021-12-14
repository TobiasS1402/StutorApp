import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { CustomError } from "../../errors";
import {
  IAppointment,
  IAppointmentInputDTO,
} from "../../interfaces/IAppointment";
import { ITimeslotInputDTO } from "../../interfaces/ITimeslot";
import AppointmentService from "../../service/appointment";
import TimeslotService from "../../service/timeslot";
import util from "../../util";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/appointments", route);

  route.get(
    "/me",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const appointmentServiceInstance = Container.get(AppointmentService);
        const { appointments } =
          await appointmentServiceInstance.GetAllFromCurrentWeek(
            req.currentUser
          );

        return res.status(200).json({ appointments });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );

  route.post(
    "/",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object().keys({
        location: Joi.string().required(),
        description: Joi.string().required(),
        timeslotId: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Validate if timeslotId is existing
        if (req.body.timeslotId) {
          const timeslotServiceInstance = Container.get(TimeslotService);
          await timeslotServiceInstance.GetTimeslotById({
            _id: req.body.timeslotId,
          } as ITimeslotInputDTO);
        }

        let input: IAppointmentInputDTO = {
          ...(req.body as IAppointmentInputDTO),
          userId: req.currentUser._id,
        };

        const appointmentServiceInstance = Container.get(AppointmentService);
        const appointment = await appointmentServiceInstance.CreateAppointment(
          input
        );
        return res.status(200).json({ appointment });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
