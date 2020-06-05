const userService = require("./../services/userService");
const APIUtilities = require("./../services/apiUtilities");

module.exports = {
  getCart: (req, res) => {
    const userId = res.locals.userId;
    const queryObject = { fields: "cart" };
    new APIUtilities(userService.getUser(userId), queryObject)
      .fields()
      .query.then((cart) => {
        return res.status(200).json(cart);
      })
      .catch(console.error);
  },
  addCourseToCart: (req, res) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    userService
      .addCourseToCart(userId, course)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch(console.error);
  },
  deleteCourseFromCart: (req, res) => {
    const userId = res.locals.userId;
    const course = req.body.course;
    userService
      .deleteCourseFromCart(userId, course)
      .then((cart) => {
        return res.status(200).json(cart);
      })
      .catch(console.error);
  },
};
