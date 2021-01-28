const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const validationRouter = require('./routes/validations');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/validate-rule', validationRouter);

app.use('*', function (_, res) {
  res.status(404).json({
    message: 'Route not found',
    status: 'error',
    data: null,
  });
});

app.use(function (err, _, res, next) {
  if (res.headersSent) return next(err);

  if (err.message.search('JSON') !== -1) {
    err.message = 'Invalid JSON payload passed.';
  }

    res.status(err.status || 500).json({
      message: err.status < 500 ? err.message : 'Something went wrong!',
      status: 'error',
      data: null,
    });
});

module.exports = app;
