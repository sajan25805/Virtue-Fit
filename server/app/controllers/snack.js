import Snack from "../models/Snack.js";

// Create Snack
export const createSnack = async (req, res) => {
  try {
    const snack = new Snack(req.body);
    await snack.save();
    res.status(201).json({
      success: true,
      message: "Snack created successfully",
      snack: { ...snack._doc },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Snacks
export const getAllSnacks = async (req, res) => {
  try {
    const snacks = await Snack.find().populate("trainer");
    res.status(200).json({
      success: true,
      message: "Snacks fetched successfully",
      snacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Snacks by Trainer ID
export const getSnacksByTrainer = async (req, res) => {
  try {
    const snacks = await Snack.find({ trainer: req.params.trainerId }).populate("trainer");
    res.status(200).json({
      success: true,
      message: "Snacks by trainer fetched successfully",
      snacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Snack by ID
export const getSnackById = async (req, res) => {
  try {
    const snack = await Snack.findById(req.params.id).populate("trainer");
    if (!snack) {
      return res.status(404).json({
        success: false,
        message: "Snack not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Snack fetched successfully",
      snack,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Snack
export const updateSnack = async (req, res) => {
  try {
    const snack = await Snack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!snack) {
      return res.status(404).json({
        success: false,
        message: "Snack not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Snack updated successfully",
      snack,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Snack
export const deleteSnack = async (req, res) => {
  try {
    const snack = await Snack.findByIdAndDelete(req.params.id);
    if (!snack) {
      return res.status(404).json({
        success: false,
        message: "Snack not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Snack deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
