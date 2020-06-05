const express = require("express");
const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes");
const cartRouter = require("./routes/cartRoutes");
const wishListRouter = require("./routes/wishListRoutes");
const firebaseConnect = require("./middleware/firebaseConnect");

const app = express();
app.use(express.json());
app.use(firebaseConnect.checkAuth);

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishListRouter);
app.all("*", (req, res, next) => {
  res.status(404).json("not found");
  next();
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "error!";
  res.status(err.statusCode).json(err.message);
});
module.exports = app;
