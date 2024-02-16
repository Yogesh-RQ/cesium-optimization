const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = { generateToken };
