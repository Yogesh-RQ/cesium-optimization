const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(require("../config/config.js")["development"]);

const connectDB = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  sequelize.sync({ alter: false }).then(() => {
    console.log("All models synchronized successfully.");
  });
};

module.exports = { connectDB, sequelize };
