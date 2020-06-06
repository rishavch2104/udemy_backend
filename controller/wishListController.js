const userService = require("../services/userService");
const APIFeatures = require("../services/apiUtilities");

module.exports = {
  getWishList: (req, res, next) => {
    const userId = res.locals.userId;
    const queryObject = { fields: "wishlist" };
    new APIFeatures(userService.getUser(userId), queryObject)
      .fields()
      .query.then((wishlist) => {
        return res.status(200).json(wishlist);
      });
  },
  addCourseToWishList: (req, res, next) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    return userService.addCourseToWishList(userId, course).then((user) => {
      return res.status(200).json(user);
    });
  },
  deleteCourseFromWishList: (req, res, next) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    return userService.deleteCourseFromWishList(userId, course).then((user) => {
      return res.status(200).json(user);
    });
  },
};
