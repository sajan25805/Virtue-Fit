import { Router } from "express";

import {
  createMeal,
  getMealsByTrainer,
  getMealById,
  updateMeal,
  deleteMeal,
  getMeals
} from "../controllers/meal.js";

import { upload } from '../middleware/multer.js';


const router = Router();



router.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }
  ]),
  createMeal
);

// Get all meals
router.get("/", getMeals);

// Get meals by trainer ID
router.get("/trainer/:trainerId", getMealsByTrainer);

// Get meal by ID
router.get("/:id", getMealById);

// Update meal by ID
router.put("/:id",   upload.fields([
  { name: 'thumbnail', maxCount: 1 }
]),updateMeal);

// Delete meal by ID
router.delete("/:id", deleteMeal);


export { router as mealRoute };


