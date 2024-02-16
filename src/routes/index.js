const authRoutes = require("./auth.routes");

const routes = (app) => {
  app.use("/api/v1/auth", authRoutes);
};

module.exports = routes;
