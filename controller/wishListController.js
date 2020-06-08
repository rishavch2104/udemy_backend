const userService = require('../services/userService');
const APIFeatures = require('../services/apiUtilities');

module.exports = {
  getWishList: (req, res, next) => {
    const firebaseId = res.locals.firebaseId;
    const queryObject = { fields: 'studentOptions' };
    const config = { populate: ['wishlist'] };
    new APIFeatures(userService.getUser(firebaseId, config), queryObject)
      .fields()
      .query.then((studentOptions) => {
        return res.status(200).json(studentOptions[0].studentOptions.wishlist);
      });
  },
  addCourseToWishList: (req, res, next) => {
    const firebaseId = res.locals.firebaseId;
    const course = req.body.course;
    return userService.addCourseToWishList(firebaseId, course).then((user) => {
      return res.status(200).json(user);
    });
  },
  deleteCourseFromWishList: (req, res, next) => {
    const firebaseId = res.locals.firebaseId;
    const course = req.body.course;
    return userService
      .deleteCourseFromWishList(firebaseId, course)
      .then((user) => {
        return res.status(200).json(user);
      });
  },
};
