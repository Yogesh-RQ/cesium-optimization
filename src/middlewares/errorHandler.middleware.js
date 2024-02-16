const { StatusCodes } = require("http-status-codes");
const { checkIsDev } = require("../utils/checkIsDev");

const errorHandlerMiddleware = (err, req, res, next) => {
  const isDev = checkIsDev();

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  if (err.message === "Validation error") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  const response = {
    message: customError.message,
  };

  if (isDev) {
    response.details = err.stack;
  }

  return res.status(customError.statusCode).json(response);
};

module.exports = errorHandlerMiddleware;
