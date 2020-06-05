const express = require("express");
const wishListController = require("../controller/wishListController");
const router = express.Router();

router
  .route("/")
  .get(wishListController.getWishList)
  .patch(wishListController.addCourseToWishList)
  .delete(wishListController.deleteCourseFromWishList);

module.exports = router;
