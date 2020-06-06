const express = require("express");
const router = express.Router();
const courseController = require("./../controller/courseController");
const asyncHandler = require("./../services/asyncHandler");

router
  .route("/")
  .get(asyncHandler(courseController.getCourse))
  .post(asyncHandler(courseController.addCourse));

router
  .route("/:id/updateLecture")
  .patch(asyncHandler(courseController.addLectureToCourse))
  .delete(asyncHandler(courseController.deleteLectureFromCourse));
router
  .route("/:id")
  .get(asyncHandler(courseController.getCourseById))
  .patch(asyncHandler(courseController.updateCourse));
module.exports = router;
