const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: { type: String, required: [true, 'Review cannot be empty'] },
  rating: { type: Number, required: true, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
    required: [true, 'Course cannot be empty'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'User cannot be empty'],
  },
});
const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
