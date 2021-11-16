class CustomError extends Error {
  statusCode: number;
  constructor(error, lang: string = "en") {
    super(error.messages[lang]);
    this.name = error.name;
    this.statusCode = error.statusCode;
  }
}

export { CustomError };
