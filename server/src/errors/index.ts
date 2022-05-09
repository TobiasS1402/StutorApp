
class CustomError extends Error {
  statusCode: number;
  /**
   * Send a custom error message that is based on the error's in the json file
   */
  constructor(error, lang: string = "en") {
    super(error.messages[lang]);
    this.name = error.name;
    this.statusCode = error.statusCode;
  }
}

export { CustomError };
