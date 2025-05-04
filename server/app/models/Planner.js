import mongoose from "mongoose";

const plannerItemSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ["workout", "meal", "snack", "meditation"], required: true },
  item: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "items.type" },
  completed: { type: Boolean, default: false }
});

const plannerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  items: [plannerItemSchema]
}, { timestamps: true });

export const Planner = mongoose.model("Planner", plannerSchema);
