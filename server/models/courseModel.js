import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  CourseTitle: { type: String, required: true, unique: true },
  CourseId:    { type: String, default: "" ,unique: true},
  CourseType:  { type: String, default: "Self-Paced" },
  Description: { type: String, required: true },
  Duration:    { type: String, default: "" },
  Price:       { type: Number, default: 0 },
  Image:       { type: String, default: "" },
});

const Course_tb = mongoose.model("Course_tb", courseSchema);
export default Course_tb;
