import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const snackScheam = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    calories: { type: Number, required: true }, // Total calorie count
    protein: { type: Number, required: true }, // Protein in grams
    carbs: { type: Number, required: true }, // Carbohydrates in grams
    fats: { type: Number, required: true }, // Fats in grams
    thumbnail: { type: String }, // Image URL for the snack
    recipes: { type: [String], required: true }, // Step-by-step preparation
    ingredients: { type: [String], required: true }, // List of ingredients
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    trainerName: { type: String, required: true }, // Storing trainer's name directly for quick access
    isVegetarian: { type: Boolean, default: false }, // Indicates if the snack is vegetarian
    isVegan: { type: Boolean, default: false }, // Indicates if the snack is vegan
    isGlutenFree: { type: Boolean, default: false }, // Indicates if the snack is gluten-free
    servingSize: { type: String, required: true }, // Serving size info (e.g., "1 cup", "50g")
    prepTime: { type: Number, required: true }, // Preparation time in minutes
  },
  { timestamps: true }
);

export const Snack = model("Snack", snackScheam);
