const express = require('express');
const firebaseConnect = require('./../middleware/firebaseConnect');
const reviewConroller = require('./../controller/reviewController');
const asyncHandler = require('./../services/asyncHandler');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(asyncHandler(reviewConroller.getReview))
  .post(firebaseConnect.checkAuth, asyncHandler(reviewConroller.addReview));

module.exports = router;
