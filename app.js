const express = require('express');
const userRouter = require('./routes/userRoutes');
const courseRouter = require('./routes/courseRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishListRouter = require('./routes/wishListRoutes');
const AppError = require('./errorHandling/appError');
const globalErrorHandler = require('./errorHandling/globalErrorHandler');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishListRouter);
app.all('*', (req, res, next) => {
  next(new AppError('fail', 404));
});
app.use(globalErrorHandler);

module.exports = app;
