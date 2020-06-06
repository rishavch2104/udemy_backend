const userService = require("./../services/userService");
const APIUtilities = require("./../services/apiUtilities");

module.exports = {
  getCart: (req, res, next) => {
    const userId = res.locals.userId;
    const queryObject = { fields: "cart" };
    return new APIUtilities(userService.getUser(userId), queryObject)
      .fields()
      .query.then((cart) => {
        return res.status(200).json(cart);
      });
  },
  addCourseToCart: (req, res, next) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    return userService.addCourseToCart(userId, course).then((user) => {
      return res.status(200).json(user);
    });
  },
  deleteCourseFromCart: (req, res, next) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    return userService.deleteCourseFromCart(userId, course).then((cart) => {
      return res.status(200).json(cart);
    });
  },
};
