const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { JWT_SECRET_KEY } = require("../config/config.js");
const APIErrorResponse = require("../errors");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw new APIErrorResponse.UnauthenticatedError("UnAuthorized user");
      }
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      if (!decoded) {
        throw new APIErrorResponse.UnauthenticatedError("UnAuthorized user");
      }
      req.user = decoded;
    }

    if (!token) {
      res.status(401);
      throw new Error("not authorized, no token");
    }
  } catch (err) {
    next(err);
  }
  return next();
});

module.exports = { authMiddleware };
