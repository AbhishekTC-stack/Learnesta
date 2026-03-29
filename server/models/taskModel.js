//taskModel.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  TaskTitle: { type: String, required: true },
  Description: { type: String, required: true },
  DueDate: { type: Date, required: true },
  Course: { type: mongoose.Schema.Types.ObjectId, ref: "Course_tb", required: true }
});

const Task=mongoose.model("Task", taskSchema);
export default Task;