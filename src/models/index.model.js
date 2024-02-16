const { sequelize } = require("../database/connectdb.js");
const User = require("./user.model.js");
const Role = require("./role.model.js");

User.belongsTo(Role);
Role.hasMany(User);

module.exports = {
  User,
  Role,
  sequelize,
};
