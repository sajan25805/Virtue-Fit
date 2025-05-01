import mongoose from "mongoose";

const workoutProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
  isCompleted: { type: Boolean, default: false },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  reminderSent: { type: Boolean, default: false } // New field to track reminder status
}, { timestamps: true });

export const WorkoutProgress = mongoose.model("WorkoutProgress", workoutProgressSchema);
