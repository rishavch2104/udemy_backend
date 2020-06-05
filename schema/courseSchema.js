const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  category: { type: String, enum: ["Finance", "Arts", "Development", "Music"] },
  timeSpent: { type: "String", enum: ["0-2", "2-4", "4-6"] },
  lectures: [
    {
      title: String,
      contentType: { type: String, enum: ["video", "article"] },
      content: String,
    },
  ],
  isPublished: { type: Boolean, default: false },
});

const Courses = mongoose.model("Courses", courseSchema);
module.exports = Courses;
