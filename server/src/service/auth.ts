import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import {
  DuplicateError,
  InternalServerError,
  NotFoundError,
} from "../util/errors";
import { sign } from "jsonwebtoken";
import config from "../config";
import messages from "../messages";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: Models.User,
    @Inject("logger") private logger: Logger
  ) {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      // Check if user already exists
      const existingRecord = await this.userModel.findOne({
        where: {
          email: userInputDTO.email,
        },
      });
      if (existingRecord) {
        throw new DuplicateError(
          messages(userInputDTO.language).DUPLICATE_EMAIL_ERROR
        );
      }

      // Create User in database
      const userRecord = await this.userModel.create({
        email: userInputDTO.email,
        username: userInputDTO.username,
        language: userInputDTO.language,
      } as IUser);
      if (!userRecord)
        throw new InternalServerError(
          messages(userInputDTO.language).USER_CREATE_INTERNAL_SERVER_ERROR
        );

      const token = this.generateToken(userRecord);
      const user = userRecord.toJSON() as IUser;
      Reflect.deleteProperty(user, "pin");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    // Fetch the user from the database
    const userRecord = await this.userModel.findOne({
      where: { email: userInputDTO.email },
    });
    if (!userRecord)
      throw new NotFoundError(messages(userInputDTO.language).USER_NOT_FOUND);

    const token = this.generateToken(userRecord);
    const user = userRecord.toJSON() as IUser;
    Reflect.deleteProperty(user, "pin");
    Reflect.deleteProperty(user, "salt");
    return { user, token };
  }

  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return sign(
      {
        _id: user._id,
        name: user.username,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
