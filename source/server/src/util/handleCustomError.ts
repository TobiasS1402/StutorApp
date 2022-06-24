import { Container } from "typedi";
import { Logger as _Logger } from "winston";

/**
 * Throws a made error message in the console from the given information from 'e'
 * @param e
 * @param res
 * @param next
 */
const handleCustomError = (e, res, next?) => {
  const Logger: _Logger = Container.get("logger");

  if (e.statusCode) {
    return res.status(e.statusCode).json({ error: e.name, message: e.message });
  }

  Logger.error("Unhandled error: %o", e);

  if (next) {
    return next(e);
  } else {
    throw e;
  }
};

export default handleCustomError;
