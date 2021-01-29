const express = require('express');
const requestValidator = require('../middlewares/requestValidator');

const router = express.Router();
const { validateRequestBody } = requestValidator;

router.post('/', validateRequestBody, function (req, res) {
  res.send('Work In Progress');
});

module.exports = router;
