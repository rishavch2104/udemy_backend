const express = require('express');
const router = express.Router();
const courseController = require('./../controller/courseController');
const asyncHandler = require('./../services/asyncHandler');
const userCredentials = require('../middleware/userCredential.js');
const firebaseConnect = require('../middleware/firebaseConnect');

router
  .route('/')
  .get(asyncHandler(courseController.getCourse))
  .post(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    asyncHandler(courseController.addCourse)
  );

router
  .route('/:id/updateLecture')
  .patch(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    asyncHandler(courseController.addLectureToCourse)
  )
  .delete(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    asyncHandler(courseController.deleteLectureFromCourse)
  );
router
  .route('/:id')
  .get(asyncHandler(courseController.getCourseById))
  .patch(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    asyncHandler(courseController.updateCourse)
  );
module.exports = router;
