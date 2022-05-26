import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
