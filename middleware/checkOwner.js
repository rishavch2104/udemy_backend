const userService = require('./../services/userService');
const courseService = require('./../services/courseService');
const AppError = require('./../errorHandling/appError');
module.exports = async (req, res, next) => {
  const courseId = req.params.id;

  const user = await userService.getUser(res.locals.firebaseId);
  const course = await courseService.getCourseById(courseId);
  console.log({ uid: course.userId, id: user[0]._id });
  console.log(`${course.userId === user[0]._id}`);
  if (user[0]._id.toString() === course.userId.toString()) {
    next();
  } else {
    next(new AppError('You are not authorized to perform this action', 403));
  }
};
