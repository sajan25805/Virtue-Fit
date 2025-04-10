import { Meal } from "../models/Meals.js";
import fs from "fs";
import { uploadToCloudinary } from '../config/cloudinary.js';

// Create Meal
export const createMeal = async (req, res) => {
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

    const meal = new Meal({
      ...req.body,
      thumbnail: thumbnailUrl,
    });

    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Meals (with optional filters)
export const getMeals = async (req, res) => {
  try {
    const { type, calories } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (calories) filter.calories = { $lte: calories };

    const meals = await Meal.find(filter).populate({
      path: 'trainer',
      select: 'name email specialization profilePicture',
    });

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Meal by ID
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate({
      path: 'trainer',
      select: 'name email specialization bio profilePicture',
    });

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Meal
export const updateMeal = async (req, res) => {
  try {
    const { files } = req;
    const updates = { ...req.body };

    if (files?.thumbnail) {
      updates.thumbnail = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path);
    }

    const meal = await Meal.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Meal updated successfully',
      meal,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Meal
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    res.status(200).json({ success: true, message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Meals by Trainer
export const getMealsByTrainer = async (req, res) => {
  try {
    const meals = await Meal.find({ trainer: req.params.trainerId }).populate({
      path: 'trainer',
      select: 'name email bio specialization profilePicture',
    });

    res.status(200).json({
      success: true,
      message: 'Meals by trainer fetched successfully',
      meals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
