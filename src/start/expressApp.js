const express = require("express");
const { connectDB } = require("../database/connectdb");
const morgan = require("morgan");
const notFound = require("../middlewares/notFound.middleware");
const errorHandlerMiddleware = require("../middlewares/errorHandler.middleware");
const routes = require("../routes");
const { checkIsDev } = require("../utils/checkIsDev");
const seedroles = require("../scripts/seedroles");

module.exports = async () => {
  await connectDB();
  await seedroles();

  const app = express();

  if (checkIsDev()) {
    app.use(morgan("dev"));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app);

  app.use(notFound);
  app.use(errorHandlerMiddleware);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
