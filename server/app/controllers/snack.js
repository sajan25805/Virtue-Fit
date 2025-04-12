import { Snack } from "../models/Snack.js";
import fs from "fs";
import { uploadToCloudinary } from '../config/cloudinary.js';

// Create Snack
export const createSnack = async (req, res) => {
  try {
    const { files } = req;
    let thumbnailUrl = '';

    if (files?.thumbnail) {
      thumbnailUrl = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path); // Remove temp file
    }

    if (!req.body.trainer) {
      return res.status(400).json({ message: "Trainer ID is required" });
    }

    const snack = new Snack({
      ...req.body,
      thumbnail: thumbnailUrl,
    });

    await snack.save();
    res.status(201).json(snack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Snacks (with optional filters)
export const getAllSnacks = async (req, res) => {
  try {
    const { type, calories } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (calories) filter.calories = { $lte: calories };

    const snacks = await Snack.find(filter).populate({
      path: 'trainer',
      select: 'name email specialization profilePicture',
    });

    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Snack by ID
export const getSnackById = async (req, res) => {
  try {
    const snack = await Snack.findById(req.params.id).populate({
      path: 'trainer',
      select: 'name email specialization bio profilePicture',
    });

    if (!snack) {
      return res.status(404).json({ message: 'Snack not found' });
    }

    res.json(snack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Snack
export const updateSnack = async (req, res) => {
  try {
    const { files } = req;
    const updates = { ...req.body };

    if (files?.thumbnail) {
      updates.thumbnail = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path);
    }

    const snack = await Snack.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!snack) {
      return res.status(404).json({ message: 'Snack not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Snack updated successfully',
      snack,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Snack
export const deleteSnack = async (req, res) => {
  try {
    const snack = await Snack.findByIdAndDelete(req.params.id);

    if (!snack) {
      return res.status(404).json({ message: 'Snack not found' });
    }

    res.status(200).json({ success: true, message: 'Snack deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Snacks by Trainer
export const getSnacksByTrainer = async (req, res) => {
  try {
    const snacks = await Snack.find({ trainer: req.params.trainerId }).populate({
      path: 'trainer',
      select: 'name email bio specialization profilePicture',
    });

    res.status(200).json({
      success: true,
      message: 'Snacks by trainer fetched successfully',
      snacks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
