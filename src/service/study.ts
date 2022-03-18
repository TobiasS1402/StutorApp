import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { IStudy, IStudyInputDTO } from "../interfaces/IStudy";
import { CustomError } from "../errors";
import responses from "../errors/responses.json";

@Service()
export default class StudyService {
  constructor(
    @Inject("studyModel") private studyModel: Models.Study,
    @Inject("logger") private logger: _Logger
  ) {}

  public async GetAllStudies(): Promise<{ studies: IStudy[] }> {
    try {
      this.logger.silly("Fetching studies from db");
      const studyRecord = await this.studyModel.findAll({});

      if (studyRecord.length <= 0)
        throw new CustomError(responses.STUDY_NOT_FOUND);

      const studies: IStudy[] = studyRecord.map(
        (study) => study.toJSON() as IStudy
      );
      return { studies };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetStudyById(
    studyInputDTO: Partial<IStudyInputDTO>
  ): Promise<{ study: IStudy }> {
    try {
      this.logger.silly("Fetching study from db");
      const studyRecord = await this.studyModel.findOne({
        where: { _id: studyInputDTO._id },
      });

      if (!studyRecord) throw new CustomError(responses.STUDY_NOT_FOUND);

      const study = studyRecord.toJSON() as IStudy;
      return { study };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
