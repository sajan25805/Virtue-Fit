// models/Program.js
import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
  day: Number,
  week: Number,
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
  meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
  snack: { type: mongoose.Schema.Types.ObjectId, ref: "Snack" },
  meditation: { type: mongoose.Schema.Types.ObjectId, ref: "Meditation" }
});

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  days: [DaySchema]
}, { timestamps: true });

export const Program = mongoose.model("Program", ProgramSchema);
