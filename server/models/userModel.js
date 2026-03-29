import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course_tb" },

  completedMaterials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Material" }
  ],

  completedTasks: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
  ],

  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date }
});

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, default: "" },
  UserName: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  UserRole: { type: String, enum: ["admin", "student"], default: "student" },

  EnrolledCourses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course_tb", default: [] }
  ],

  Progress: [progressSchema],   // ✅ NEW FIELD

  TrialStartDate: { type: Date, default: Date.now },
  IsPaid: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);