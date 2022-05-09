import Container from "typedi";
import { Logger as _Logger } from "winston";
import UserService from "../../service/user";

/**
 * Receive user by id from request information
 * More information needed on how next() works!
 * @param req
 * @param _res
 * @param next
 */
const attachCurrentUser = async (req, _res, next) => {
  const Logger: _Logger = Container.get("logger");
  try {
    const userServiceInstance = Container.get(UserService);
    const { user } = await userServiceInstance.GetUserById(req.token);
    Reflect.deleteProperty(user, "pin");
    Reflect.deleteProperty(user, "salt");
    req.currentUser = user;
    return next();
  } catch (e) {
    Logger.error("Error attaching user to req: %o", e);
    return next(e);
  }
};

export default attachCurrentUser;
