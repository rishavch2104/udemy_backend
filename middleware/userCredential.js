const AppError = require('../errorHandling/appError');

module.exports = (credential) => {
  return (req, res, next) => {
    // if (!roles.includes(req.user.role)) {
    //   next();
    // } else {
    //   next(new AppError('You are not authorized to perform this action', 403));
    // }
    if (user.credential) {
      next();
    } else {
      next(new AppError('You are not authorized to perform this action', 403));
    }
  };
};
