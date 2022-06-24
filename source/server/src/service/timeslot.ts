import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { ITimeslot, ITimeslotInputDTO } from "../interfaces/ITimeslot";
import { CustomError } from "../errors";
import responses from "../errors/responses.json";
import { Op } from "sequelize";
import util from "../util";

@Service()
export default class TimeslotService {
  constructor(
    @Inject("timeslotModel") private timeslotModel: Models.Timeslot,
    @Inject("lessonModel") private lessonModel: Models.Lesson,
    @Inject("logger") private logger: _Logger
  ) {}

  /**
   * Get one timeslot out the DB from the given id out the parameters
   * @param timeslotInputDTO
   * @constructor
   */
  public async GetTimeslotById(
    timeslotInputDTO: Partial<ITimeslotInputDTO>
  ): Promise<{ timeslot: ITimeslot }> {
    try {
      this.logger.silly("Fetching timeslot from db");
      const timeslotRecord = await this.timeslotModel.findOne({
        where: { _id: timeslotInputDTO._id },
      });

      if (!timeslotRecord) throw new CustomError(responses.TIMESLOT_NOT_FOUND);

      const timeslot = timeslotRecord.toJSON() as ITimeslot;
      return { timeslot };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * First validates if lesson exist in DB afterward check for certain timeslots with lesson-id
   * If founded return the searched timeslots otherwise return an error message
   * @param timeslotInputDTO
   * @constructor
   */
  public async GetWeekTimeslotsForLesson(
    timeslotInputDTO: Partial<ITimeslotInputDTO>
  ): Promise<{ timeslots: ITimeslot[] }> {
    try {
      this.logger.silly("Fetching timeslots from db");

      // Validate if lesson exists
      const lessonRecord = await this.lessonModel.findOne({
        where: { _id: timeslotInputDTO.lessonId },
      });
      if (!lessonRecord) throw new CustomError(responses.LESSON_NOT_FOUND);

      const timeslotRecord = await this.timeslotModel.findAll({
        where: {
          [Op.and]: [
            { startdate: { [Op.gte]: util.getMonday(new Date()) } },
            { enddate: { [Op.lte]: util.getFriday(new Date()) } },
          ],
          lessonId: timeslotInputDTO.lessonId,
        },
      });

      if (timeslotRecord.length < 1)
        throw new CustomError(responses.TIMESLOT_NOT_FOUND);

      const timeslots: ITimeslot[] = timeslotRecord.map(
        (timeslot) => timeslot.toJSON() as ITimeslot
      );

      return { timeslots };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Create a new timeslot in the database from the given parameters
   * @param inputTimeslotDTO
   * @constructor
   */
  public async CreateTimeslot(
    inputTimeslotDTO: ITimeslotInputDTO
  ): Promise<{ timeslot: ITimeslot }> {
    try {
      const timeslotRecord = await this.timeslotModel.create({
        ...inputTimeslotDTO,
      });

      const timeslot = timeslotRecord.toJSON() as ITimeslot;
      return { timeslot };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
