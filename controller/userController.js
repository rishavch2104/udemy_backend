const UserService = require('./../services/userService');
const AppError = require('./../errorHandling/appError');
module.exports = {
  addUser: (req, res, next) => {
    const userDetails = req.body;
    userDetails.firebaseId = res.locals.firebaseId;
    if (!userDetails.displayName)
      userDetails.displayName = res.locals.displayName;
    return UserService.addUser(userDetails).then((user) => {
      return res.status(200).json(user);
    });
  },
  getUser: (req, res, next) => {
    const id = res.locals.firebaseId;
    return UserService.getUser(id).then((user) => {
      if (!user) {
        return next(new AppError('User Not Found', 404));
      }
      return res.status(200).json(user);
    });
  },
  updateUser: (req, res, next) => {
    const updateFields = req.body;
    const firebaseId = res.locals.firebaseId;
    return UserService.updateUser(updateFields, firebaseId).then((user) => {
      if (!user) {
        return next(new AppError('User Not Found', 404));
      }
      return res.status(200).json(user);
    });
  },
  updateCourseProgress: (req, res, next) => {
    const courseProgress = req.body;
    const firebaseId = res.locals.firebaseId;
    return UserService.updateCourseProgress(courseProgress, firebaseId).then(
      (user) => {
        return res.status(200).json(user);
      }
    );
  },
};
