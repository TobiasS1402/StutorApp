import { Op } from "sequelize";
import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { CustomError } from "../errors";
import { IAppointment, IAppointmentInputDTO } from "../interfaces/IAppointment";
import { IUserInputDTO } from "../interfaces/IUser";
import Lesson from "../models/Lesson.model";
import Timeslot from "../models/Timeslot.model";
import responses from "../errors/responses.json";
import getFriday from "../util/getFriday";
import getMonday from "../util/getMonday";
import e from "express";

@Service()
export default class AppointmentService {
  constructor(
    @Inject("appointmentModel") private appointmentModel: Models.Appointment,
    @Inject("logger") private logger: _Logger
  ) {}

  /**
   * Get all appointments out the database from the current user
   * @param inputUserDTO
   * @constructor
   */
  public async GetAllFromCurrentWeek(
    inputUserDTO: Partial<IUserInputDTO>
  ): Promise<{ appointments: IAppointment[] }> {
    try {
      this.logger.silly("Fetching appointments from db");

      const appointmentRecord = await this.appointmentModel.findAll({
        where: {
          [Op.and]: [
            { "$timeslot.startdate$": { [Op.gte]: getMonday(new Date()) } },
            { "$timeslot.startdate$": { [Op.lte]: getFriday(new Date()) } },
          ],
          [Op.or]: [
            { userId: inputUserDTO._id },
            { "$timeslot.lesson.userId$": inputUserDTO._id },
          ],
        },
        include: this.appointmentIncludes(),
      });

      if (appointmentRecord.length < 1)
        throw new CustomError(responses.APPOINTMENT_NOT_FOUND);

      const appointments: IAppointment[] = appointmentRecord.map(
        (appointment) => appointment.toJSON() as IAppointment
      );

      return { appointments };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Check in DB if appointment already exist otherwise create a new appointment in DB
   * @param inputAppointmentDTO
   * @constructor
   */
  public async CreateAppointment(
    inputAppointmentDTO: IAppointmentInputDTO
  ): Promise<{ appointment: IAppointment }> {
    try {
      // Check if there isn't already a reservation
      const reservationRecord = await this.appointmentModel.findOne({
        where: {
          timeslotId: inputAppointmentDTO.timeslotId,
        },
      });
      if (reservationRecord)
        throw new CustomError(responses.DUPLICATE_APPOINTMENT);

      // Create appointment
      const appointmentRecord = await this.appointmentModel.create({
        ...inputAppointmentDTO,
      });

      const appointment = appointmentRecord.toJSON() as IAppointment;
      return { appointment };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Data forms
   */
  private appointmentIncludes() {
    return [
      {
        model: Timeslot,
        attributes: [],
        as: "timeslot",
        include: [
          {
            model: Lesson,
            attributes: ["userId"],
            as: "lesson",
          },
        ],
      },
    ];
  }
}
