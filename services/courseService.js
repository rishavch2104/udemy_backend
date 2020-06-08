const Courses = require('./../schema/courseSchema');

module.exports = {
  getCourse: (config) => {
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
    return Courses.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
  },
  addLectureToCourse: (lecture, id) => {
    console.log(lecture);
    return Courses.findByIdAndUpdate(
      id,
      { $addToSet: { lectures: lecture.lecture } },
      { new: true, runValidators: true }
    );
  },
  deleteLectureFromCourse: (lecture, id) => {
    return Courses.findByIdAndUpdate(
      id,
      { $pull: { lectures: lecture.lecture } },
      { new: true }
    );
  },
};
