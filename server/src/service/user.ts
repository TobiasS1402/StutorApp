import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import messages from "../messages";
import { NotFoundError } from "../util/errors";

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
      });

      if (!userRecord) throw new NotFoundError(messages().USER_NOT_FOUND);
      const user = this.RemoveCredentialsFromUser(userRecord.toJSON() as IUser);
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private RemoveCredentialsFromUser(user: IUser): IUser {
    Reflect.deleteProperty(user, "pin");
    Reflect.deleteProperty(user, "salt");
    return user;
  }
}
