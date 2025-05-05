const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1';

// router
const authRouter = require('./app/api/v1/auth/router');
const userRefreshTokenRouter = require('./app/api/v1/userRefreshToken/router');
const usersRouter = require('./app/api/v1/users/router');
const eventsRouter = require('./app/api/v1/events/router');

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

// app.listen(3000, () => console.log('Server ready on port 3000.'));

app.get('/', (req, res) => res.send('Welcome to API InsightGathers'));

// app router
app.use(`${v1}`, authRouter);
app.use(`${v1}`, userRefreshTokenRouter);
app.use(`${v1}`, usersRouter);
app.use(`${v1}`, eventsRouter);

// app middlewares
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
