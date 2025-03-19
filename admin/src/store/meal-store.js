import { create } from "zustand";

export const useMealStore = create((set) => ({
  meals: [
    {
      id: "1",
      name: "Protein Smoothie",
      description: "Banana, protein powder, almond milk, and berries",
      dietaryType: "Vegetarian",
      calories: 350,
      protein: 25,
      carbs: 40,
      fats: 8,
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: "2",
      name: "Chicken Salad",
      description: "Grilled chicken breast with mixed greens and balsamic dressing",
      dietaryType: "Regular",
      calories: 450,
      protein: 35,
      carbs: 15,
      fats: 20,
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: "3",
      name: "Vegan Buddha Bowl",
      description: "Quinoa, roasted vegetables, avocado, and tahini dressing",
      dietaryType: "Vegan",
      calories: 550,
      protein: 15,
      carbs: 70,
      fats: 25,
      createdAt: Date.now() - 86400000,
    },
  ],
  addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
  updateMeal: (id, updatedMeal) =>
    set((state) => ({
      meals: state.meals.map((meal) => (meal.id === id ? { ...meal, ...updatedMeal } : meal)),
    })),
  deleteMeal: (id) =>
    set((state) => ({
      meals: state.meals.filter((meal) => meal.id !== id),
    })),
}));
