const checkIsDev = () => {
  const env = process.env.NODE_ENV;
  return env === "development";
};

module.exports = { checkIsDev };
