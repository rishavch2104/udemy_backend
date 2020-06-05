const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String, required: false },
  headLine: { type: String },
  userId: { type: String, required: true },
  biography: {
    text: { type: String },
    options: {
      isBold: { type: Boolean, default: false },
      isItalic: { type: Boolean, default: false },
    },
  },
  website: {
    type: String,
  },
  socialMediaLogins: {
    facebook: String,
    google: String,
    github: String,
  },
  paymentOptions: {
    type: [String],
  },
  isTeacher: {
    type: Boolean,
    default: false,
  },
  studentOptions: {
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    courseStatus: [
      {
        courseId: String,
        videosTicked: [Boolean],
        currentVideo: String,
        datePurchased: Date,
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
  },
  teacherOptions: {
    courses: [String],
  },
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
