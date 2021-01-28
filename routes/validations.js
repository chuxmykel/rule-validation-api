const express = require('express');
const validator = require('../middlewares/validator');

const router = express.Router();
const { validateRequestBody } = validator;

router.post('/',validateRequestBody, function (req, res) {

  res.send('Work In Progress');
});

module.exports = router;
