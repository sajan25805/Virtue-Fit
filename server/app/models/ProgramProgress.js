// models/ProgramProgress.js
import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  completed: [
    {
      day: Number,
      type: { type: String, enum: ["workout", "meal", "snack", "meditation"] },
      completedAt: Date
    }
  ]
}, { timestamps: true });

export const ProgramProgress = mongoose.model("ProgramProgress", ProgressSchema);
