const express = require("express");
const wishListController = require("../controller/wishListController");
const asyncHandler = require("./../services/asyncHandler");
const router = express.Router();

router
  .route("/")
  .get(asyncHandler(wishListController.getWishList))
  .patch(asyncHandler(wishListController.addCourseToWishList))
  .delete(asyncHandler(wishListController.deleteCourseFromWishList));

module.exports = router;
