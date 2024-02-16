const { User, Role } = require("../models/index.model");
const APIErrorResponse = require("../errors");
const asyncHandler = require("express-async-handler");

const checkPermission = (requiredPermissions) =>
  asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    if (!email) {
      throw new APIErrorResponse.UnauthorizedError(
        "Unauthorized to access this resource"
      );
    }

    const user = await User.findOne({
      where: { email: email },
      include: Role,
    });

    if (!user) {
      throw new APIErrorResponse.NotFoundError("User not found");
    }

    const userRole = user.dataValues.role.dataValues;

    if (userRole.permissions[requiredPermissions]) {
      next();
    } else {
      throw new APIErrorResponse.UnauthorizedError(
        "Unauthorized to access this resource"
      );
    }
  });

module.exports = checkPermission;
