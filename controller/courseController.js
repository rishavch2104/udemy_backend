const courseService = require("./../services/courseService");
const APIUtilities = require("./../services/apiUtilities");
const AppError = require("./../errorHandling/appError");
module.exports = {
  getCourse: async (req, res, next) => {
    const features = new APIUtilities(courseService.getCourse(), req.query)
      .filter()
      .sort()

      .fields();
    const courses = await features.query;
    if (!courses) {
      return next(new AppError("Course Not Found", 404));
    }
    return res.status(200).json(courses);
  },
  getCourseById: (req, res, next) => {
    const id = req.params.id;
    return courseService.getCourseById(id).then((course) => {
      if (!course) {
        return next(new AppError("Course Not Found", 404));
      }
      return res.status(200).json(course);
    });
  },
  addCourse: (req, res) => {
    const courseDetails = req.body;
    courseDetails.userId = res.locals.userId;
    return courseService.addCourse(courseDetails).then(() => {
      return res.status(200).json("Course Added");
    });
  },
  updateCourse: (req, res) => {
    const updatedFields = req.body;
    const id = req.params.id;
    return courseService
      .updateCourse(updatedFields, id)
      .then((updatedCourse) => {
        if (!updatedCourse) {
          return next(new AppError("Course Not Found", 404));
        }
        return res.status(200).json(updatedCourse);
      });
  },
  addLectureToCourse: (req, res) => {
    console.log("in add Lecture");
    const lecture = req.body;
    const id = req.params.id;
    return courseService
      .addLectureToCourse(lecture, id)
      .then((updatedCourse) => {
        if (!updatedCourse) {
          return next(new AppError("Course Not Found", 404));
        }
        return res.status(200).json(updatedCourse);
      });
  },
  deleteLectureFromCourse: (req, res) => {
    console.log("in delete lecture");
    const id = req.params.id;
    const lecture = req.body;
    return courseService
      .deleteLectureFromCourse(lecture, id)
      .then((course) => {
        if (!course) {
          return next(new AppError("Course Not Found", 404));
        }
        return res.status(200).json("Lecture Deleted");
      })
      .catch(console.error);
  },
};
