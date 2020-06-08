const Reviews = require('./../schema/reviewSchema');

module.exports = {
  getReview: (course, populate) => {
    const query = Reviews.find({ course: course });
    populate.forEach((field) => {
      query.populate({ path: field });
    });
    return query;
  },
  addReview: async (review) => {
    return await Reviews.create(review);
  },
  editReview: (updatedFields, id) => {
    return Courses.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
  },
  deleteReview: (id) => {
    return Courses.findByIdAndDelete(id);
  },
};
