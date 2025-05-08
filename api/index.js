const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const v1 = '/api/v1';

// router
const authRouter = require('../app/api/v1/auth/router');
const userRefreshTokenRouter = require('../app/api/v1/userRefreshToken/router');
const usersRouter = require('../app/api/v1/users/router');
const eventsRouter = require('../app/api/v1/events/router');
const ordersRouter = require('../app/api/v1/orders/router');
const orderItemsRouter = require('../app/api/v1/orderItems/router');
const checkoutRouter = require('../app/api/v1/checkout/router');

// middlewares
const notFoundMiddleware = require('../app/middlewares/not-found');
const handlerErrorMiddleware = require('../app/middlewares/handle-error');

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app router
app.use(`${v1}`, authRouter);
app.use(`${v1}`, userRefreshTokenRouter);
app.use(`${v1}`, usersRouter);
app.use(`${v1}`, eventsRouter);
app.use(`${v1}`, ordersRouter);
app.use(`${v1}`, orderItemsRouter);
app.use(`${v1}`, checkoutRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to API InsightGathers.',
  });
});

// app middlewares
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
