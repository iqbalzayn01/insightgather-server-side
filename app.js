const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1';

// router
const authRouter = require('./app/api/v1/auth/router');
const userRefreshTokenRouter = require('./app/api/v1/userRefreshToken/router');

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handlerErrorMiddleware = require('./app/middlewares/handle-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to API InsightGathers',
//   });
// });

app.get('/', (req, res) => res.send('Welcome to API UpSkills'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app router
app.use(`${v1}/cms`, authRouter);
app.use(`${v1}/cms`, userRefreshTokenRouter);

// app middlewares
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
