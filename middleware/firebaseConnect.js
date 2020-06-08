const { admin } = require('./firebaseAdmin');
const AppError = require('./../errorHandling/appError');
const asyncHandler = require('./../services/asyncHandler');
const userService = require('./../services/userService');
const checkAuth = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    return admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then((user) => {
        res.locals.firebaseId = user.user_id;
        return userService.findUserWithFirebaseId(user.uid, '_id');
      })
      .then((uid) => {
        if (uid) {
          res.locals.userId = uid._id;
        }
        next();
      });
  } else {
    return next(new AppError('Unauthorized', 401));
  }
});

const getUserDetails = asyncHandler((req, res, next) => {
  if (req.headers.authorization) {
    return admin
      .auth()
      .getUser(res.locals.userId)
      .then((user) => {
        res.locals.displayName = user.displayName || '';
        next();
      });
  }
});

module.exports = { checkAuth, getUserDetails };
