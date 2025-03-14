import { Router } from "express";

import {
  createMeal,
  getAllMeals,
  getMealsByTrainer,
  getMealById,
  updateMeal,
  deleteMeal
} from "../controllers/meal.js";

const router = Router();

// Create a new meal
router.post("/", createMeal);

// Get all meals
router.get("/", getAllMeals);

// Get meals by trainer ID
router.get("/trainer/:trainerId", getMealsByTrainer);

// Get meal by ID
router.get("/:id", getMealById);

// Update meal by ID
router.put("/:id", updateMeal);

// Delete meal by ID
router.delete("/:id", deleteMeal);


export { router as mealRoute };


