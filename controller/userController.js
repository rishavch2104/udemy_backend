const UserService = require("./../services/userService");

module.exports = {
  addUser: (req, res) => {
    const userDetails = req.body;
    userDetails.userId = res.locals.userId;
    // userDetails.displayName = res.locals.displayName;
    UserService.addUser(userDetails)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
  },
  getUser: (req, res) => {
    const id = res.locals.userId;
    UserService.getUser(id)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
  },
  updateUser: (req, res) => {
    const updateFields = req.body;
    const id = res.locals.userId;
    UserService.updateUser(updateFields, id)
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
  },
};
