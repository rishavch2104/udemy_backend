const Users = require('./../schema/userSchema');

module.exports = {
  addUser: async (userDetails) => {
    const newUser = new Users(userDetails);
    return await newUser.save();
  },
  findUserWithFirebaseId: (firebaseId, projection) => {
    return Users.findOne({ firebaseId: firebaseId }).select(projection);
  },
  getUser: (userId, config = {}) => {
    const { populate = [] } = config;
    const query = Users.find({ firebaseId: userId });
    if (populate) {
      console.log(populate, 'in populate');
      populate.forEach((field) => {
        query.populate(field);
      });
    }
    return query;
  },
  updateUser: (fields, firebaseId) => {
    return Users.findOneAndUpdate({ firebaseId: firebaseId }, fields, {
      new: true,
      runValidators: true,
    });
  },
  addCourseToCart: (firebaseId, course) => {
    return Users.findOneAndUpdate(
      { firebaseId: firebaseId },
      { $addToSet: { 'studentOptions.cart': course } },
      { new: true, runValidators: true }
    );
  },
  deleteCourseFromCart: (firebaseId, course) => {
    return Users.findOneAndUpdate(
      { firebaseId: firebaseId },
      { $pull: { 'studentOptions.cart': course } },
      { new: true }
    );
  },
  addCourseToWishList: (firebaseId, course) => {
    return Users.findOneAndUpdate(
      { firebaseId: firebaseId },
      { $addToSet: { 'studentOptions.wishList': course } }
    );
  },
  deleteCourseFromWishList: (firebaseId, course) => {
    return Users.findOneAndUpdate(
      { firebaseId: firebaseId },
      { $pull: { 'studentOptions.wishList': course } }
    );
  },

  updateCourseProgress: (firebaseId, courseProgress) => {
    return Users.findOneAndUpdate(
      {
        firebaseId: firebaseId,
        'studentOptions.courseProgress.$.courseId': courseProgress.courseId,
      },
      { $set: { 'studentOptions.courseProgress': courseProgress } }
    );
  },
};
