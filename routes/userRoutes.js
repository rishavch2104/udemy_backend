const userController = require("./../controller/userController");
const asyncHandler = require("./../services/asyncHandler");
// const firebaseConnect = require("./../middleware/firebaseConnect");
const app = require("express");

const router = app.Router();

router
  .route("/")
  .post(asyncHandler(userController.addUser))
  .get(asyncHandler(userController.getUser))
  .patch(asyncHandler(userController.updateUser));

module.exports = router;
