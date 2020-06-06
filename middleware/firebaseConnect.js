const { admin } = require('./firebaseAdmin');
const AppError = require('./../errorHandling/appError');
const asyncHandler = require('./../services/asyncHandler');
const checkAuth = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    return admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then((user) => {
        res.locals.userId = user.user_id;
        UserService.getUser(user.user_id).then((userDB) => (req.user = userDB));

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
