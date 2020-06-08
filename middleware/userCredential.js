const AppError = require('../errorHandling/appError');
const userService = require('../services/userService');
module.exports = (credential) => {
  return async (req, res, next) => {
    const user = await userService.getUser(res.locals.firebaseId);
    // console.log(user[0], credential);
    if (user[0][credential]) {
      next();
    } else {
      next(new AppError('You are not authorized to perform this action', 403));
    }
  };
};
