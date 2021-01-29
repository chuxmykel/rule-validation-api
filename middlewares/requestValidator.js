const Joi = require('joi');

function validateRequestBody(req, res, next) {
  const schema = Joi.object({
    rule: Joi.object({
      field: Joi.string().required(),

      condition: Joi
        .string()
        .valid('eq', 'neq', 'gt', 'gte', 'contains')
        .required(),

      condition_value: Joi
        .required(),

    }).required(),

    data: Joi.required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res
      .status(400)
      .json({
        message: `${error.message.replace(/\"/g, "")}.`,
        status: 'error',
        data: null,
      });
  } else if (dataIsInvalid(req.body.data)) {
    res
      .status(400)
      .json({
        message: 'data should be an object, array or string',
        status: 'error',
        data: null,
      });
  } else {
    next();
  }
}

function dataIsInvalid(data) {
  const dataType = typeof data;
  if (dataType === 'string' || dataType === 'object') {
    return false;
  }
  return true;
}

module.exports = {
  validateRequestBody,
};
