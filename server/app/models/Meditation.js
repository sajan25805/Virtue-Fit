import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const meditationSchema = new Schema(  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    audioUrl: { type: String, required: true }, // URL for guided meditation audio
    thumbnail: { type: String }, // Image representing the session
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true }, // Associated Trainer
    trainerName: { type: String, required: true }, // Trainer's name for quick access
    category: { type: String, enum: ["Mindfulness", "Relaxation", "Sleep", "Focus", "Breathing"], required: true }, // Type of meditation
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true }, // Experience level
  },
  { timestamps: true }
);

export const Meditation = model("Meditation",meditationSchema);
