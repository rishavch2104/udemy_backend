const userService = require('./../services/userService');
const APIUtilities = require('./../services/apiUtilities');

module.exports = {
  getCart: (req, res, next) => {
    const firebaseId = res.locals.firebaseId;
    const queryObject = { fields: 'studentOptions' };
    const config = { populate: ['courses'] };
    return new APIUtilities(
      userService.getUser(firebaseId, config),
      queryObject
    )
      .fields()
      .query.then((studentOptions) => {
        return res.status(200).json(studentOptions[0].studentOptions.cart);
      });
  },
  addCourseToCart: (req, res, next) => {
    const firebaseId = res.locals.firebaseId;
    const course = req.body.course;
    return userService.addCourseToCart(firebaseId, course).then((user) => {
      return res.status(200).json(user);
    });
  },
  deleteCourseFromCart: (req, res, next) => {
    const firebaseId = res.locals.firebaseId;
    const course = req.body.course;
    return userService.deleteCourseFromCart(firebaseId, course).then((cart) => {
      return res.status(200).json(cart);
    });
  },
};
