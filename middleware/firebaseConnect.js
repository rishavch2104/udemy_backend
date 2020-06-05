const { admin } = require("./firebaseAdmin");
const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then((user) => {
        res.locals.userId = user.user_id;
        next();
      })
      .catch(() => {
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("auth token not found");
  }
};

const getUserDetails = (req, res, next) => {
  if (req.headers.authorization) {
    admin
      .auth()
      .getUser(res.locals.userId)
      .then((user) => {
        res.locals.displayName = user.displayName || "";
      })
      .catch((err) => console.log(err));
    next();
  }
};

module.exports = { checkAuth, getUserDetails };
