import { Inject, Service } from "typedi";
import { Logger as _Logger } from "winston";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import { CustomError } from "../errors";
import StellarSDK from "stellar-sdk";
import responses from "../errors/responses.json";
import { sign } from "jsonwebtoken";
import config from "../config";
import { verify } from "argon2";
import util from "../util";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: Models.User,
    @Inject("logger") private logger: _Logger
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
        throw new CustomError(responses.DUPLICATE_USER);
      }

      // Generate public & private key
      const keypair = StellarSDK.Keypair.random();
      const pubKey = keypair.publicKey();
      const privKey = keypair.secret();

      // Create User in database
      const userRecord = await this.userModel.create({
        email: userInputDTO.email,
        username: userInputDTO.username,
        publicKey: pubKey,
        privateKey: privKey,
        avatar: "http://globemoving.com/wp-content/uploads/2015/08/user.jpg",
      } as IUser);
      if (!userRecord)
        throw new CustomError(responses.USER_CREATE_INTERNAL_SERVER);

      const token = this.generateToken(userRecord);
      const user = this.RemoveCredentialsFromUser(userRecord.toJSON() as IUser);
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
    if (!userRecord) throw new CustomError(responses.USER_NOT_FOUND);

    // Return the user info
    const token = this.generateToken(userRecord);
    const user = this.RemoveCredentialsFromUser(userRecord.toJSON() as IUser);
    return { user, token };
  }

  public async SignInPin(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    // Fetch the user from the database
    const userRecord = await this.userModel.findOne({
      where: { email: userInputDTO.email },
    });
    if (!userRecord) throw new CustomError(responses.USER_NOT_FOUND);

    // Check if user has set a pin
    if (!userRecord.pin) throw new CustomError(responses.PIN_NOT_FOUND);

    // If pin input invalid return
    if (util.isPinInvalid(userInputDTO.pin))
      throw new CustomError(responses.USER_PIN_INVALID);

    // Check if pin is equal to the database one
    const validPin = await verify(userRecord.pin, userInputDTO.pin.toString());
    if (validPin) {
      const token = this.generateToken(userRecord);
      const user = this.RemoveCredentialsFromUser(userRecord.toJSON() as IUser);
      return { user, token };
    } else {
      throw new CustomError(responses.INCORRECT_PIN);
    }
  }

  private RemoveCredentialsFromUser(user: IUser): IUser {
    Reflect.deleteProperty(user, "pin");
    Reflect.deleteProperty(user, "salt");
    Reflect.deleteProperty(user, "privateKey");
    return user;
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
