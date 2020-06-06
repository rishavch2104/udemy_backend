const UserService = require('./../services/userService');
const AppError = require('./../errorHandling/appError');
module.exports = {
  addUser: (req, res, next) => {
    const userDetails = req.body;
    userDetails.userId = res.locals.userId;
    // userDetails.displayName = res.locals.displayName;
    return UserService.addUser(userDetails).then((user) => {
      return res.status(200).json(user);
    });
  },
  getUser: (req, res, next) => {
    const id = res.locals.userId;
    return UserService.getUser(id).then((user) => {
      if (!user) {
        return next(new AppError('User Not Found', 404));
      }
      return res.status(200).json(user);
    });
  },
  updateUser: (req, res, next) => {
    const updateFields = req.body;
    const id = res.locals.userId;
    return UserService.updateUser(updateFields, id).then((user) => {
      if (!user) {
        return next(new AppError('User Not Found', 404));
      }
      return res.status(200).json(user);
    });
  },
};
