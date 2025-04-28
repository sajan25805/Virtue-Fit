import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const workoutProgressSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
    isCompleted: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

export const WorkoutProgress = model('WorkoutProgress', workoutProgressSchema);
