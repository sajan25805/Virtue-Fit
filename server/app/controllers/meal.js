import  { Meal } from "../models/Meals.js";

// Create Meal
export const createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      meal: { ...meal._doc },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find().populate("trainer");
    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      meals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Meals by Trainer ID
export const getMealsByTrainer = async (req, res) => {
  try {
    const meals = await Meal.find({ trainer: req.params.trainerId }).populate("trainer");
    res.status(200).json({
      success: true,
      message: "Meals by trainer fetched successfully",
      meals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Meal by ID
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("trainer");
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meal fetched successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Meal
export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      meal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Meal
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
