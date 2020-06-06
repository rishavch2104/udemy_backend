const express = require("express");
const cartController = require("./../controller/cartController");
const asyncHandler = require("./../services/asyncHandler");
const router = express.Router();

router
  .route("/")
  .get(asyncHandler(cartController.getCart))
  .patch(asyncHandler(cartController.addCourseToCart))
  .delete(asyncHandler(cartController.deleteCourseFromCart));

module.exports = router;
