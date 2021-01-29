const express = require('express');
const router = express.Router();

router.get('/', function (_, res) {
  res.json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Ngwobia, Chukwudi Mike',
      github: '@chuxmykel',
      email: 'ngwobiachukwudi@gmail.com',
      mobile: '07060854773',
      twitter: '@oh_my_zsh',
    },
  });
});

module.exports = router;
