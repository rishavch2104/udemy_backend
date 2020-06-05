const Courses = require("./../schema/courseSchema");

module.exports = {
  getCourse: () => {
    return Courses.find();
  },
  getCourseById: (id) => {
    return Courses.findById(id);
  },
  addCourse: async (course) => {
    const newCourse = new Courses(course);
    return await newCourse.save();
  },
  updateCourse: (updatedFields, id) => {
    return Courses.findByIdAndUpdate(id, updatedFields, { new: true });
  },
  addLectureToCourse: (lecture, id) => {
    return Courses.findByIdAndUpdate(
      id,
      { $addToSet: { lectures: lecture } },
      { new: true }
    );
  },
  deleteLectureFromCourse: (lecture, id) => {
    return Courses.findByIdAndUpdate(
      id,
      { $pull: { lectures: lecture } },
      { new: true }
    );
  },
};
