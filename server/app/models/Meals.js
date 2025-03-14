import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const mealSchema = new Schema({ 
    title: { type: String, required: true },
    description: { type: String, required: true },
    calories: { type: Number, required: true }, // Total calorie count
    protein: { type: Number, required: true }, // Protein in grams
    carbs: { type: Number, required: true }, // Carbohydrates in grams
    fats: { type: Number, required: true }, // Fats in grams
    thumbnail: { type: String }, // Image URL for the meal
    recipes: { type: [String], required: true }, // Step-by-step preparation
    ingredients: { type: [String], required: true }, // List of ingredients
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true }, // Associated Trainer
    trainerName: { type: String, required: true }, // Storing trainer's name directly for quick access
    isVegetarian: { type: Boolean, default: false }, // Indicates if the meal is vegetarian
    isVegan: { type: Boolean, default: false }, // Indicates if the meal is vegan
    isGlutenFree: { type: Boolean, default: false }, // Indicates if the meal is gluten-free
  },
  { timestamps: true });


export const Meal = model("Meal",mealSchema);
