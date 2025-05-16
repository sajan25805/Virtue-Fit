import { Meditation } from "../models/Meditation.js";
import fs from "fs";
import { uploadToCloudinary } from '../config/cloudinary.js';

// Create Meditation
export const createMeditation = async (req, res) => {
  try {
    const { files } = req;
    let audioUrl = '';
    let thumbnailUrl = '';

    console.log(files);


    // Upload audio file
    if (files?.audioUrl) {
      audioUrl = await uploadToCloudinary(files.audioUrl[0].path, 'video');
      console.log(audioUrl);
      fs.unlinkSync(files.audioUrl[0].path); // Remove temp file
    }

  

    // Upload thumbnail if provided
    if (files?.thumbnail) {
      thumbnailUrl = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path); // Remove temp file
    }

    if (!req.body.trainer) {
      return res.status(400).json({ message: "Trainer ID is required" });
    }

    const meditation = new Meditation({
      ...req.body,
      audioUrl,
      thumbnail: thumbnailUrl,
    });

    await meditation.save();
    res.status(201).json(meditation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Meditations (with optional filters)
export const getMeditations = async (req, res) => {
  try {
    const { category, level } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (level) filter.level = level;

    const meditations = await Meditation.find(filter).sort({ createdAt: -1 });
    res.json(meditations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Meditation by ID
export const getMeditationById = async (req, res) => {
  try {
    const meditation = await Meditation.findById(req.params.id).populate({
      path: 'trainer',
      select: 'name email specialization bio profilePicture',
    });
    
    if (!meditation) {
      return res.status(404).json({ message: 'Meditation not found' });
    }

    res.json(meditation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Meditation
export const updateMeditation = async (req, res) => {
  try {
    const { files } = req;
    const updates = { ...req.body };

    // Handle file uploads
    if (files?.audioUrl) {
      updates.audioUrl = await uploadToCloudinary(files.audioUrl[0].path, 'video');
      fs.unlinkSync(files.audioUrl[0].path);
    }
    if (files?.thumbnail) {
      updates.thumbnail = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path);
    }

    const meditation = await Meditation.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true }
    );

    if (!meditation) {
      return res.status(404).json({ message: 'Meditation not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Meditation updated successfully',
      meditation,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Meditation
export const deleteMeditation = async (req, res) => {
  try {
    const meditation = await Meditation.findByIdAndDelete(req.params.id);

    if (!meditation) {
      return res.status(404).json({ message: 'Meditation not found' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Meditation deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Meditations by Trainer
export const getMeditationsByTrainer = async (req, res) => {
  try {
    const meditations = await Meditation.find({ 
      trainer: req.params.trainerId 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Meditations by trainer fetched successfully',
      meditations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
