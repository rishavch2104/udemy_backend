const Users = require("./../schema/userSchema");

module.exports = {
  addUser: async (userDetails) => {
    const newUser = new Users(userDetails);
    return await newUser.save();
  },
  getUser: (userId) => {
    return Users.find({ userId: userId });
  },
  updateUser: (fields, userId) => {
    return Users.findOneAndUpdate({ userId: userId }, fields, { new: true });
  },
  addCourseToCart: (userId, course) => {
    return Users.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { "studentOptions.cart": course } },
      { new: true }
    );
  },
  deleteCourseFromCart: (userId, course) => {
    return Users.findOneAndUpdate(
      { userId: userId },
      { $pull: { "studentOptions.cart": course } }
    );
  },
  addCourseToWishList: (userId, course) => {
    return Users.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { "studentOptions.wishList": course } }
    );
  },
  deleteCourseFromWishList: (userId, course) => {
    return Users.findOneAndUpdate(
      { userId: userId },
      { $pull: { "studentOptions.wishList": course } }
    );
  },
};
