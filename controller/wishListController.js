const userService = require("../services/userService");
const APIFeatures = require("../services/apiUtilities");

module.exports = {
  getWishList: (req, res) => {
    const userId = res.locals.userId;
    const queryObject = { fields: "wishlist" };
    new APIFeatures(userService.getUser(userId), queryObject)
      .fields()
      .query.then((wishlist) => {
        return res.status(200).json(wishlist);
      })
      .catch(console.error);
  },
  addCourseToWishList: (req, res) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    userService
      .addCourseToWishList(userId, course)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch(console.error);
  },
  deleteCourseFromWishList: (req, res) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    userService
      .deleteCourseFromWishList(userId, course)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch(console.error);
  },
};
