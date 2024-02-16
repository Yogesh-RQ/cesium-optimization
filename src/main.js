const expressApp = require("./start/expressApp");

const startServer = async () => {
  await expressApp();
};

startServer();
