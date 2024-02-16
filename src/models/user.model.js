const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connectdb.js");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      },
    },
  }
);

module.exports = User;
