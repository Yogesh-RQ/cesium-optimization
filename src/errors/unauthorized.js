const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customAPI");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN; //403
  }
}

module.exports = UnauthorizedError;
