import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { CustomError } from "../errors";
import { ICourse } from "../interfaces/ICourse";
import responses from "../errors/responses.json";
import { IStudyInputDTO } from "../interfaces/IStudy";

@Service()
export default class CourseService {
  constructor(
    @Inject("courseModel") private courseModel: Models.Course,
    @Inject("studyModel") private studyModel: Models.Study,
    @Inject("logger") private logger: _Logger
  ) {}

  /**
   * Get all Courses from the DB
   * @constructor
   */
  public async GetAllCourses(): Promise<{ courses: ICourse[] }> {
    try {
      this.logger.silly("Fetching courses from db");
      const courseRecord = await this.courseModel.findAll({});

      if (courseRecord.length <= 0)
        throw new CustomError(responses.COURSE_NOT_FOUND);

      const courses: ICourse[] = courseRecord.map(
        (course) => course.toJSON() as ICourse
      );
      return { courses };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   * Get all Courses from study out the DB
   * If not found search for all Courses in DB
   * @param studyInputDTO
   * @constructor
   */
  public async GetAllCoursesByStudy(
    studyInputDTO: Partial<IStudyInputDTO>
  ): Promise<{ courses: ICourse[] }> {
    try {
      this.logger.silly("Fetching courses from db");

      const studyRecord = await this.studyModel.findOne({
        where: { _id: studyInputDTO._id },
      });

      if (!studyRecord) throw new CustomError(responses.STUDY_NOT_FOUND);

      const courseRecord = await this.courseModel.findAll({
        where: { studyId: studyInputDTO._id },
      });

      if (courseRecord.length <= 0)
        throw new CustomError(responses.COURSE_NOT_FOUND);

      const courses: ICourse[] = courseRecord.map(
        (course) => course.toJSON() as ICourse
      );
      return { courses };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
