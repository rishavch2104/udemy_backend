const express = require("express");
const cartController = require("./../controller/cartController");
const router = express.Router();

router
  .route("/")
  .get(cartController.getCart)
  .patch(cartController.addCourseToCart)
  .delete(cartController.deleteCourseFromCart);

module.exports = router;
