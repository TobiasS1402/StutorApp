import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: Models.User,
    @Inject("logger") private logger: Logger
  ) {}

  public async SignUp(): Promise<String> {
    return "Signed up";
  }
}
