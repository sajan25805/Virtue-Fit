import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    duration: { type: Number, required: true },
    videoUrl: { type: String },
    time: { type: Number },
    aim: { type: String, enum: ["strength", "cardio", "flexibility"] },
    thumbnail: { type: String },
    calorie: { type: Number },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },

    sections: [
      {
        title: { type: String },
        description: { type: String },
        exercises: [
          {
            name: { type: String },
            duration: { type: String },
            thumbnail: { type: String }
          }
        ]
      }
    ],

    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 }
      }
    ],

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", WorkoutSchema);
