import { hash } from "argon2";
import { randomBytes } from "crypto";
import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import messages from "../messages";
import { InternalServerError, NotFoundError } from "../util/errors";

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

  public async ChangePin(
    userInputDTO: IUserInputDTO,
    newpin: string
  ): Promise<void> {
    // Fetch the user from the database
    const userRecord = await this.userModel.findOne({
      where: { email: userInputDTO.email },
    });
    if (!userRecord) throw new NotFoundError(messages().USER_NOT_FOUND);

    // Generate hash and salt
    const salt = randomBytes(32);
    const hashedPin = await hash(newpin, { salt });
    const result = await this.userModel.update(
      { pin: hashedPin, salt: salt.toString("hex") },
      { where: { email: userInputDTO.email } }
    );

    if (result[0] <= 0) {
      throw new InternalServerError(
        messages(userRecord.language).PIN_INTERNAL_SERVER_ERROR
      );
    }
  }

  private RemoveCredentialsFromUser(user: IUser): IUser {
    Reflect.deleteProperty(user, "pin");
    Reflect.deleteProperty(user, "salt");
    return user;
  }
}
