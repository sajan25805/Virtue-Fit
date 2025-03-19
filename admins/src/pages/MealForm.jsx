"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import useStore from "../store/store"
import { v4 as uuidv4 } from "uuid"

const MealForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { meals, addMeal, updateMeal } = useStore()

  const isEditMode = id !== "new"

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    recipes: "",
  })

  useEffect(() => {
    if (isEditMode) {
      const meal = meals.find((m) => m.id === id)
      if (meal) {
        setFormData({
          title: meal.title,
          description: meal.description,
          calories: meal.calories.toString(),
          protein: meal.macronutrients.protein.replace("g", ""),
          carbs: meal.macronutrients.carbs.replace("g", ""),
          fats: meal.macronutrients.fats.replace("g", ""),
          recipes: meal.recipes,
        })
      }
    }
  }, [isEditMode, id, meals])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const mealData = {
      title: formData.title,
      description: formData.description,
      calories: Number.parseInt(formData.calories),
      macronutrients: {
        protein: `${formData.protein}g`,
        carbs: `${formData.carbs}g`,
        fats: `${formData.fats}g`,
      },
      recipes: formData.recipes,
    }

    if (isEditMode) {
      updateMeal(id, mealData)
    } else {
      addMeal({
        id: uuidv4(),
        ...mealData,
      })
    }

    navigate("/meals")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/meals")}
          className="p-2 rounded-lg hover:bg-neutral-secondary/30 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <h1 className="text-2xl font-bold text-primary">{isEditMode ? "Edit Meal" : "Add New Meal"}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-primary">
                Meal Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter meal title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="calories" className="block text-sm font-medium text-primary">
                Calories
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter calories"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-primary">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter meal description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="protein" className="block text-sm font-medium text-primary">
                Protein (g)
              </label>
              <input
                type="number"
                id="protein"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter protein in grams"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="carbs" className="block text-sm font-medium text-primary">
                Carbs (g)
              </label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter carbs in grams"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fats" className="block text-sm font-medium text-primary">
                Fats (g)
              </label>
              <input
                type="number"
                id="fats"
                name="fats"
                value={formData.fats}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter fats in grams"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="recipes" className="block text-sm font-medium text-primary">
              Recipe Instructions
            </label>
            <textarea
              id="recipes"
              name="recipes"
              value={formData.recipes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter recipe instructions"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
            >
              <Save size={18} />
              <span>{isEditMode ? "Update Meal" : "Save Meal"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MealForm

