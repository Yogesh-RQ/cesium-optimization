const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken.js");
const { User } = require("../models/index.model.js");
const { Role } = require("../models/index.model.js");
const enums = require("../enums/index.js");
const APIErrorResponse = require("../errors");

const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body.register;

  const role = await Role.findOne({
    where: { name: enums.roles.VIEWER },
  });

  if (!role) {
    throw new APIErrorResponse.NotFoundError("Role not found");
  }

  await User.create({
    email,
    password,
    roleId: role.dataValues.id,
  });

  res.status(201).json({
    message: "user created successfully",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body.login;

  const user = await User.findOne({
    where: { email: email },
    include: Role,
  });

  if (!user) {
    throw new APIErrorResponse.NotFoundError("User does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const userRole = user.dataValues.role.dataValues.name;
    const payload = {
      email: user.email,
      userId: user.id,
      userRole,
    };
    res.status(200).json({
      id: user.id,
      email: user.email,
      role_name: userRole,
      token: generateToken(payload),
    });
  } else {
    throw new APIErrorResponse.UnauthenticatedError(
      "Incorrect Email or Password"
    );
  }
});

const protect = asyncHandler((req, res) => {
  res.json({ message: "protected route accessed successfully" });
});

module.exports = { createUser, loginUser, protect };
