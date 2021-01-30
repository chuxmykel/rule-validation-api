const express = require('express');

const requestValidator = require('../middlewares/requestValidator');
const validateRule = require('../utils/rule-validator');

const router = express.Router();
const { validateRequestBody } = requestValidator;

router.post('/', validateRequestBody, function (req, res) {
  const { field } = req.body.rule;
  const successMessage = `field ${field} successfully validated.`;
  const errorMessage = `field ${field} failed validation.`;

  try {
    const result = validateRule(req.body);
    const { error } = result.validation;

    res.status(error ? 400 : 200).json({
      message: error ? errorMessage : successMessage,
      status: error ? 'error' : 'success',
      data: result,
    });
  } catch ({ message }) {
    res.status(400).json({
      message,
      status: 'error',
      data: null,
    });
  }
});

module.exports = router;
