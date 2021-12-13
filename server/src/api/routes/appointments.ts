import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import AppointmentService from "../../service/appointment";
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
};
