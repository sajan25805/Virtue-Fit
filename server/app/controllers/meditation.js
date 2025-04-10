import { Meditation } from "../models/Meditation.js";

// Create Meditation
export const createMeditation = async (req, res) => {
  try {
    const meditation = new Meditation(req.body);
    await meditation.save();
    res.status(201).json({
      success: true,
      message: "Meditation created successfully",
      meditation: { ...meditation._doc },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// Get All Meditations
export const getAllMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find().populate("trainer");
    res.status(200).json({
      success: true,
      message: "Meditations fetched successfully",
      meditations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Meditations by Trainer ID
export const getMeditationsByTrainer = async (req, res) => {
  try {
    const meditations = await Meditation.find({ trainer: req.params.trainerId }).populate("trainer");
    res.status(200).json({
      success: true,
      message: "Meditations by trainer fetched successfully",
      meditations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Meditation by ID
export const getMeditationById = async (req, res) => {
  try {
    const meditation = await Meditation.findById(req.params.id).populate("trainer");
    if (!meditation) {
      return res.status(404).json({
        success: false,
        message: "Meditation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meditation fetched successfully",
      meditation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Meditation
export const updateMeditation = async (req, res) => {
  try {
    const meditation = await Meditation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meditation) {
      return res.status(404).json({
        success: false,
        message: "Meditation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meditation updated successfully",
      meditation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Meditation
export const deleteMeditation = async (req, res) => {
  try {
    const meditation = await Meditation.findByIdAndDelete(req.params.id);
    if (!meditation) {
      return res.status(404).json({
        success: false,
        message: "Meditation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meditation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
