import { WorkoutProgress } from "../models/WorkoutProgress.js";
import { Notification } from "../models/Notification.js";

// Start a workout
export const startWorkout = async (req, res) => {
  try {
    const { workoutId } = req.body;
    const userId = req.userId;

    const progress = await WorkoutProgress.create({
      user: userId,
      workout: workoutId
    });

    res.status(201).json({ success: true, message: "Workout started", progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark workout as completed
export const completeWorkout = async (req, res) => {
  try {
    const { workoutProgressId } = req.params;

    const progress = await WorkoutProgress.findById(workoutProgressId);

    if (!progress) return res.status(404).json({ success: false, message: "Progress not found" });
    if (progress.isCompleted) return res.status(400).json({ success: false, message: "Already completed" });

    progress.isCompleted = true;
    progress.completedAt = new Date();
    await progress.save();

    res.status(200).json({ success: true, message: "Workout marked as completed", progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all workout progress for the logged-in user
export const getUserWorkoutProgress = async (req, res) => {
  try {
    const progress = await WorkoutProgress.find({ user: req.userId }).populate("workout");
    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Error fetching workout progress:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};