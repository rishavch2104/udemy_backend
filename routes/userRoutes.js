const userController = require("./../controller/userController");
// const firebaseConnect = require("./../middleware/firebaseConnect");
const app = require("express");

const router = app.Router();

router
  .route("/")
  .post(userController.addUser)
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
