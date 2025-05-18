import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
  completed: [{
    day: Number,
    type: { type: String, enum: ["workout", "meal", "snack", "meditation"] },
    completedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const ProgramProgress = mongoose.model("ProgramProgress", progressSchema);
