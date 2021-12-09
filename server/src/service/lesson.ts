import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import Timeslot from "../models/Timeslot.model";
import Appointment from "../models/Appointment.model";
import Review from "../models/Review.model";
import User from "../models/User.model";
import Study from "../models/Study.model";
import responses from "../errors/responses.json";
import { ILesson, ILessonInputDTO } from "../interfaces/ILesson";
import { CustomError } from "../errors";
import Course from "../models/Course.model";
import { ICourseInputDTO } from "../interfaces/ICourse";

@Service()
export default class LessonService {
  constructor(
    @Inject("lessonModel") private lessonModel: Models.Lesson,
    @Inject("courseModel") private courseModel: Models.Course,
    @Inject("logger") private logger: _Logger
  ) {}

  public async GetLessonById(
    lessonInputDTO: Partial<ILessonInputDTO>
  ): Promise<{ lesson: ILesson }> {
    try {
      this.logger.silly("Fetching lesson from db");
      const lessonRecord = await this.lessonModel.findOne({
        where: { _id: lessonInputDTO._id },
        attributes: [
          "_id",
          "description",
          "timeframe",
          "price",
          [
            Sequelize.fn(
              "AVG",
              Sequelize.col("timeslots.appointment.review.rating")
            ),
            "avgRating",
          ],
        ],
        group: ["Lesson._id"],
        include: this.fullLessonIncludes(),
      });
      if (!lessonRecord) throw new CustomError(responses.LESSON_NOT_FOUND);

      const lesson = lessonRecord as ILesson;
      return { lesson };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetAllLessonsByCourse(
    courseInputDTO: Partial<ICourseInputDTO>
  ): Promise<{ lessons: ILesson[] }> {
    try {
      this.logger.silly("Fetching lessons from db");

      const courseRecord = await this.courseModel.findOne({
        where: { _id: courseInputDTO._id },
      });

      if (!courseRecord) throw new CustomError(responses.COURSE_NOT_FOUND);

      const lessonRecord = await this.lessonModel.findAll({
        where: { courseId: courseRecord._id },
        attributes: [
          "_id",
          "description",
          "timeframe",
          "price",
          [
            Sequelize.fn(
              "AVG",
              Sequelize.col("timeslots.appointment.review.rating")
            ),
            "avgRating",
          ],
        ],
        group: ["Lesson._id"],
        include: this.smallLessonIncludes(),
      });

      if (lessonRecord.length <= 0)
        throw new CustomError(responses.LESSON_NOT_FOUND);

      const lessons: ILesson[] = lessonRecord.map(
        (lesson) => lesson.toJSON() as ILesson
      );
      return { lessons };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Data forms
   */

  private smallLessonIncludes() {
    return [
      {
        model: Timeslot,
        attributes: [],
        as: "timeslots",
        include: [
          {
            model: Appointment,
            attributes: [],
            as: "appointment",
            where: { _id: { [Op.ne]: null } },
            include: [
              {
                model: Review,
                attributes: [],
                as: "review",
              },
            ],
          },
        ],
      },
      {
        model: User,
        attributes: ["username", "avatar"],
      },
    ];
  }

  private fullLessonIncludes() {
    return [
      {
        model: Timeslot,
        attributes: [],
        as: "timeslots",
        include: [
          {
            model: Appointment,
            attributes: [],
            as: "appointment",
            where: { _id: { [Op.ne]: null } },
            include: [
              {
                model: Review,
                attributes: [],
                as: "review",
              },
            ],
          },
        ],
      },
      {
        model: User,
        attributes: ["username", "avatar", "year", "description"],
        as: "user",
        include: [
          {
            model: Study,
            attributes: ["name"],
            as: "study",
          },
        ],
      },
      {
        model: Course,
        as: "course",
        attributes: ["name"],
      },
    ];
  }
}
