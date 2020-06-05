const app = require("./app");
const mongoose = require("mongoose");
const { adminInit } = require("./middleware/firebaseAdmin");
const PORT = 8000;

adminInit();
mongoose.connect("mongodb://localhost/udemy_backend", {
  useNewUrlParser: true,
});
mongoose.set("useFindAndModify", false);

mongoose.connection.on("connected", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
