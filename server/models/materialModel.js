import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Content: { type: String, required: true },
  Course: { type: mongoose.Schema.Types.ObjectId, ref: "Course_tb", required: true },
  CreatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Material", materialSchema);
