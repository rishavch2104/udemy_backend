const express = require('express');
const wishListController = require('../controller/wishListController');
const asyncHandler = require('./../services/asyncHandler');
const firebaseConnect = require('./../middleware/firebaseConnect');
const router = express.Router();

router
  .route('/')
  .get(firebaseConnect.checkAuth, asyncHandler(wishListController.getWishList))
  .patch(
    firebaseConnect.checkAuth,
    asyncHandler(wishListController.addCourseToWishList)
  )
  .delete(
    firebaseConnect.checkAuth,
    asyncHandler(wishListController.deleteCourseFromWishList)
  );

module.exports = router;
