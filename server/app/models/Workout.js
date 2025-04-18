import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
        duration: { type: Number, required: true }, // Duration in minutes
        videoUrl: { type: String },
        time: {type:Number},
        aim: { type: String, enum: ["strength", "cardio", "flexibility" ]},
        thumbnail: { type: String },
        isCompleted: { type: Boolean, default: false },
        completedAt: { type: Date },
        calorie: {type: Number},
        trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true }, // Linked Trainer
      },
      { timestamps: true }
);

export const Workout =  mongoose.model('Workout', WorkoutSchema);
