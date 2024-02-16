const Joi = require("joi");

const LOGIN_REQUEST_SCHEMA = Joi.object({
  body: Joi.object({
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
  params: Joi.object({}),
  query: Joi.object({}),
});

const REGISTER_REQUEST_SCHEMA = Joi.object({
  body: Joi.object({
    register: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).required(),
  }).required(),
  params: Joi.object({}),
  query: Joi.object({}),
});

module.exports = { LOGIN_REQUEST_SCHEMA, REGISTER_REQUEST_SCHEMA };
