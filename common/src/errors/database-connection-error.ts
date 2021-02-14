import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Failed to connect to datbase";

  constructor() {
    super("Database connection error");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
