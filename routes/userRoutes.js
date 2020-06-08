const userController = require('./../controller/userController');
const asyncHandler = require('./../services/asyncHandler');
const firebaseConnect = require('./../middleware/firebaseConnect');
const app = require('express');

const router = app.Router();

router
  .route('/')
  .post(firebaseConnect.checkAuth, asyncHandler(userController.addUser))
  .get(firebaseConnect.checkAuth, asyncHandler(userController.getUser))
  .patch(firebaseConnect.checkAuth, asyncHandler(userController.updateUser));

router
  .route('/courseprogress')
  .patch(
    firebaseConnect.checkAuth,
    asyncHandler(userController.updateCourseProgress)
  );

module.exports = router;
