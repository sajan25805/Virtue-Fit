import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const mealSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    calories: { type: Number, required: true }, // Total calorie count
    protein: { type: Number, required: true }, // Protein in grams
    carbs: { type: Number, required: true }, // Carbohydrates in grams
    fats: { type: Number, required: true }, // Fats in grams
    thumbnail: { type: String }, // Image URL for the meal
    recipes: { type: [String], required: true }, // Step-by-step preparation
    ingredients: { type: [String], required: true }, // List of ingredients
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    trainerName: { type: String, required: true }, // Storing trainer's name directly for quick access
    isVegetarian: { type: Boolean, default: false }, // Indicates if the meal is vegetarian
    isVegan: { type: Boolean, default: false }, // Indicates if the meal is vegan
    isGlutenFree: { type: Boolean, default: false }, // Indicates if the meal is gluten-free
  },
  { timestamps: true }
);

export const Meal = model("Meal", mealSchema);



// import mongoose from "mongoose";
// import { Schema, model } from "mongoose";

// const mealSchema = new Schema(
//   {
//     title: { 
//       type: String, 
//       required: [true, "Meal title is required"],
//       trim: true,
//       maxlength: [100, "Title cannot exceed 100 characters"]
//     },
//     description: { 
//       type: String, 
//       required: [true, "Description is required"],
//       trim: true,
//       maxlength: [500, "Description cannot exceed 500 characters"]
//     },
//     calories: { 
//       type: Number, 
//       required: [true, "Calorie count is required"],
//       min: [0, "Calories cannot be negative"]
//     },
//     protein: { 
//       type: Number, 
//       required: true,
//       min: 0 
//     },
//     carbs: { 
//       type: Number, 
//       required: true,
//       min: 0 
//     },
//     fats: { 
//       type: Number, 
//       required: true,
//       min: 0 
//     },
//     thumbnail: { 
//       type: String,
//       default: "https://via.placeholder.com/300x200?text=Meal+Image" 
//     },
//     recipes: { 
//       type: [String], 
//       required: true,
//       validate: {
//         validator: function(v) {
//           return v.length > 0;
//         },
//         message: "At least one recipe step is required"
//       }
//     },
//     ingredients: { 
//       type: [String], 
//       required: true,
//       validate: {
//         validator: function(v) {
//           return v.length > 0;
//         },
//         message: "At least one ingredient is required"
//       }
//     },
//     prepTime: { 
//       type: Number, 
//       min: 0,
//       default: 0
//     },
//     cookTime: { 
//       type: Number, 
//       min: 0,
//       default: 0
//     },
//     totalTime: { 
//       type: Number, 
//       min: 0,
//       default: 0
//     },
//     trainer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Trainer",
//       required: true
//     },
//     trainerName: { 
//       type: String, 
//       required: true 
//     },
//     isVegetarian: { 
//       type: Boolean, 
//       default: false 
//     },
//     isVegan: { 
//       type: Boolean, 
//       default: false 
//     },
//     isGlutenFree: { 
//       type: Boolean, 
//       default: false 
//     },
//     likes: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "User",
//       default: []
//     },
//     ratings: [{
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       rating: { type: Number, min: 1, max: 5 }
//     }],
//     averageRating: {
//       type: Number,
//       min: 0,
//       max: 5,
//       default: 0
//     }
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Calculate total time before saving
// mealSchema.pre('save', function(next) {
//   if (this.isModified('prepTime') || this.isModified('cookTime')) {
//     this.totalTime = this.prepTime + this.cookTime;
//   }
//   next();
// });

// // Calculate average rating
// mealSchema.methods.updateAverageRating = async function() {
//   const meal = await this.constructor.findById(this._id);
//   if (meal.ratings.length === 0) {
//     this.averageRating = 0;
//     return;
//   }
//   const sum = meal.ratings.reduce((acc, curr) => acc + curr.rating, 0);
//   this.averageRating = sum / meal.ratings.length;
// };

// export const Meal = model("Meal", mealSchema);