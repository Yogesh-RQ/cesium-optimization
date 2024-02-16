const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const checkPermission = require("../middlewares/checkPermission.middleware.js");
const Validate = require("../middlewares/requestValidator.middleware.js");
const { authRoutesValidator } = require("../validators/index.js");
const { authController } = require("../controllers/index.js");

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  Validate(authRoutesValidator.REGISTER_REQUEST_SCHEMA),
  authController.createUser
);

authRoutes.post(
  "/login",
  Validate(authRoutesValidator.LOGIN_REQUEST_SCHEMA),
  authController.loginUser
);

authRoutes.get(
  "/protect",
  authMiddleware,
  checkPermission("accessingViewingWorkOrders"),
  authController.protect
);

module.exports = authRoutes;
