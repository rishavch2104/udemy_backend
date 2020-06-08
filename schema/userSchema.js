const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String, required: false },
  headLine: { type: String },
  firebaseId: { type: String, required: true, unique: true },
  isTeacher: { type: Boolean, default: false },
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

  studentOptions: {
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
      },
    ],
    courseProgress: [
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
        ref: 'courses',
      },
    ],
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'courses',
      },
    ],
  },
  teacherOptions: {
    courses: [String],
  },
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
