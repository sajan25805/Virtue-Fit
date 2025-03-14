import Workout from "../models/Workout.js";

// Create Workout
export const createWorkout = async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({
      success: true,
      message: "Workout created successfully",
      workout: { ...workout._doc },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Workouts
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate("trainer");
    res.status(200).json({
      success: true,
      message: "Workouts fetched successfully",
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Workouts by Trainer ID
export const getWorkoutsByTrainer = async (req, res) => {
  try {
    const workouts = await Workout.find({ trainer: req.params.trainerId }).populate("trainer");
    res.status(200).json({
      success: true,
      message: "Workouts by trainer fetched successfully",
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Workout by ID
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate("trainer");
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Workout fetched successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Workout
export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
