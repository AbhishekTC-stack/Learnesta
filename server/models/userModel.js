import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName:  { type: String, default: "" },
  UserName:  { type: String, required: true, unique: true },
  Password:  { type: String, required: true },
  UserRole:  { type: String, enum: ["admin", "student"], default: "student" },

  EnrolledCourses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course_tb", default: [] },
  ],

  // Trial & Payment
  TrialStartDate: { type: Date, default: Date.now },
  IsPaid:         { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);