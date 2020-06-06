const express = require('express');
const cartController = require('./../controller/cartController');
const asyncHandler = require('./../services/asyncHandler');
const firebaseConnect = require('./../middleware/firebaseConnect');
const router = express.Router();

router
  .route('/')
  .get(firebaseConnect.checkAuth, asyncHandler(cartController.getCart))
  .patch(
    firebaseConnect.checkAuth,
    asyncHandler(cartController.addCourseToCart)
  )
  .delete(
    firebaseConnect.checkAuth,
    asyncHandler(cartController.deleteCourseFromCart)
  );

module.exports = router;
