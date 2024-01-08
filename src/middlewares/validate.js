const Joi = require('joi');
const httpStatus = require('http-status');
const { validationResult } = require('express-validator');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

const validateWithExpressValidaor = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  errors.name = 'ExpressValidationErrors';
  next(errors);
};

module.exports = { validate, validateWithExpressValidaor };
