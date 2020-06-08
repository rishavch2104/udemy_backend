const express = require('express');
const router = express.Router();
const courseController = require('./../controller/courseController');
const asyncHandler = require('./../services/asyncHandler');
const userCredentials = require('../middleware/userCredential.js');
const firebaseConnect = require('../middleware/firebaseConnect');
const reviewRouter = require('./reviewRoutes');
const checkOwner = require('./../middleware/checkOwner');

router
  .route('/')
  .get(asyncHandler(courseController.getCourse)) //TODO Paginate
  .post(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    asyncHandler(courseController.addCourse)
  );

router
  .route('/:id/updatelecture')
  .patch(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    checkOwner,
    asyncHandler(courseController.addLectureToCourse)
  )
  .delete(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    checkOwner,
    asyncHandler(courseController.deleteLectureFromCourse)
  );

router.use('/:courseId/review', reviewRouter);

router
  .route('/:id')
  .get(asyncHandler(courseController.getCourseById))
  .patch(
    firebaseConnect.checkAuth,
    userCredentials('isTeacher'),
    checkOwner,
    asyncHandler(courseController.updateCourse)
  );
module.exports = router;
