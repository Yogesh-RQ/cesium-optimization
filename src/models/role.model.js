const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connectdb.js");

const Role = sequelize.define("roles", {
  name: {
    type: DataTypes.ENUM("Viewer", "Editor", "Admin", "CES Admin"),
    allowNull: false,
  },

  permissions: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
});

module.exports = Role;
