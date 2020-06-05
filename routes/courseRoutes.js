const express = require("express");
const router = express.Router();
const courseController = require("./../controller/courseController");

router
  .route("/")
  .get(courseController.getCourse)
  .post(courseController.addCourse);

router
  .route("/:id/updateLecture")
  .patch(courseController.addLectureToCourse)
  .delete(courseController.deleteLectureFromCourse);
router
  .route("/:id")
  .get(courseController.getCourseById)
  .patch(courseController.updateCourse);
module.exports = router;
