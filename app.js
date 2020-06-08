const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const userRouter = require('./routes/userRoutes');
const courseRouter = require('./routes/courseRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishListRouter = require('./routes/wishListRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./errorHandling/appError');
const globalErrorHandler = require('./errorHandling/globalErrorHandler');

const app = express();

//MORGAN LOGGING IN DEVELOPMENT
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//RATE LIMITING FROM IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
//NOSQL QUERRY INJECTION
app.use(mongoSanitize());
//XSS CODE

app.use(xss());

//PREVENT PARAMETER POLLUTION

app.use(
  hpp({
    whitelist: [],
  })
);

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishListRouter);
app.use('/review', reviewRouter);
app.all('*', (req, res, next) => {
  next(new AppError('not found', 404));
});
app.use(globalErrorHandler);

module.exports = app;
