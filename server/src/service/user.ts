import { hash } from "argon2";
import { randomBytes } from "crypto";
import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import { CustomError } from "../errors";
import responses from "../errors/responses.json";
import util from "../util";
import Study from "../models/Study.model";

@Service()
export default class UserService {
  constructor(
    @Inject("userModel") private userModel: Models.User,
    @Inject("logger") private logger: _Logger
  ) {}

  public async GetUserById(
    userInputDTO: Partial<IUserInputDTO>
  ): Promise<{ user: IUser }> {
    try {
      this.logger.silly("Fetching user from db");
      const userRecord = await this.userModel.findOne({
        where: { _id: userInputDTO._id },
        include: this.userIncludes(),
      });
      if (!userRecord) throw new CustomError(responses.USER_NOT_FOUND);

      const user = this.RemoveCredentialsFromUser(userRecord.toJSON() as IUser);
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async ChangeUser(userInputDTO: IUserInputDTO): Promise<void> {
    const userRecord = await this.userModel.findOne({
      where: { email: userInputDTO.email },
    });
    if (!userRecord) throw new CustomError(responses.USER_NOT_FOUND);

    const result = await this.userModel.update(
      { ...userInputDTO },
      { where: { email: userInputDTO.email } }
    );

    if (result[0] <= 0) {
      throw new CustomError(responses.USER_UPDATE_INTERNAL_SERVER);
    }
  }

  public async ChangePin(
    userInputDTO: IUserInputDTO,
    newpin: string
  ): Promise<void> {
    if (util.isPinInvalid(newpin))
      throw new CustomError(responses.USER_PIN_INVALID);

    const userRecord = await this.userModel.findOne({
      where: { email: userInputDTO.email },
    });
    if (!userRecord) throw new CustomError(responses.USER_NOT_FOUND);

    const salt = randomBytes(32);
    const hashedPin = await hash(newpin, { salt });
    const result = await this.userModel.update(
      { pin: hashedPin, salt: salt.toString("hex") },
      { where: { email: userInputDTO.email } }
    );

    if (result[0] <= 0) {
      throw new CustomError(responses.PIN_CHANGE_INTERNAL_SERVER);
    }
  }

  private RemoveCredentialsFromUser(user: IUser): IUser {
    Reflect.deleteProperty(user, "pin");
    Reflect.deleteProperty(user, "salt");
    Reflect.deleteProperty(user, "privateKey");
    return user;
  }

  /**
   * Data forms
   */

  private userIncludes() {
    return [
      {
        model: Study,
        attributes: ["name"],
        as: "study",
      },
    ];
  }
}
