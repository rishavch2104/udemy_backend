const courseService = require("./../services/courseService");
const APIUtilities = require("./../services/apiUtilities");
module.exports = {
  getCourse: async (req, res) => {
    const features = new APIUtilities(courseService.getCourse(), req.query)
      .filter()
      .sort()

      .fields();
    const courses = await features.query;
    return res.status(200).json(courses);
  },
  getCourseById: (req, res) => {
    const id = req.params.id;
    courseService
      .getCourseById(id)
      .then((course) => {
        return res.status(200).json(course);
      })
      .catch(console.error);
  },
  addCourse: (req, res) => {
    const courseDetails = req.body;
    courseDetails.userId = res.locals.userId;
    courseService
      .addCourse(courseDetails)
      .then(() => {
        return res.status(200).json("Course Added");
      })
      .catch(console.error);
  },
  updateCourse: (req, res) => {
    const updatedFields = req.body;
    const id = req.params.id;
    courseService
      .updateCourse(updatedFields, id)
      .then((updatedCourse) => {
        return res.status(200).json(updatedCourse);
      })
      .catch(console.error);
  },
  addLectureToCourse: (req, res) => {
    console.log("in add Lecture");
    const lecture = req.body;
    const id = req.params.id;
    courseService
      .addLectureToCourse(lecture, id)
      .then((updatedCourse) => {
        return res.status(200).json(updatedCourse);
      })
      .catch(console.error);
  },
  deleteLectureFromCourse: (req, res) => {
    console.log("in delete lecture");
    const id = req.params.id;
    const lecture = req.body;
    courseService
      .deleteLectureFromCourse(lecture, id)
      .then(() => {
        return res.status(200).json("Lecture Deleted");
      })
      .catch(console.error);
  },
};
