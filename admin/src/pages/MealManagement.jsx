"use client"

import { useState } from "react"
import { useMealStore } from "../store/meal-store"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select } from "../components/ui/select"
import { Filter, FilterGroup } from "../components/ui/filter"
import { Utensils, Edit, Trash, Plus, X } from "lucide-react"

export function MealManagement() {
  const { meals, addMeal, updateMeal, deleteMeal } = useMealStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dietaryType: "Regular",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  })
  const [filter, setFilter] = useState("All")

  const dietaryOptions = [
    { label: "All Types", value: "All" },
    { label: "Regular", value: "Regular" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Vegan", value: "Vegan" },
    { label: "Gluten-Free", value: "Gluten-Free" },
    { label: "Keto", value: "Keto" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" || name === "description" || name === "dietaryType" ? value : Number(value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateMeal(editingId, { ...formData })
      setEditingId(null)
    } else {
      addMeal({
        ...formData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      })
    }
    setIsAdding(false)
    setFormData({
      name: "",
      description: "",
      dietaryType: "Regular",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    })
  }

  const handleEdit = (meal) => {
    setFormData({
      name: meal.name,
      description: meal.description,
      dietaryType: meal.dietaryType,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
    })
    setEditingId(meal.id)
    setIsAdding(true)
  }

  const filteredMeals = meals.filter((meal) => {
    return filter === "All" || meal.dietaryType === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meal Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              name: "",
              description: "",
              dietaryType: "Regular",
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Meal
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Meal" : "Add New Meal"}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAdding(false)
                setEditingId(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Meal Name
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="dietaryType" className="mb-1 block text-sm font-medium">
                Dietary Type
              </label>
              <Select id="dietaryType" name="dietaryType" value={formData.dietaryType} onChange={handleInputChange}>
                <option value="Regular">Regular</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Keto">Keto</option>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label htmlFor="calories" className="mb-1 block text-sm font-medium">
                  Calories
                </label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  min="0"
                  value={formData.calories}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="protein" className="mb-1 block text-sm font-medium">
                  Protein (g)
                </label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  min="0"
                  value={formData.protein}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="carbs" className="mb-1 block text-sm font-medium">
                  Carbs (g)
                </label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  min="0"
                  value={formData.carbs}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="fats" className="mb-1 block text-sm font-medium">
                  Fats (g)
                </label>
                <Input id="fats" name="fats" type="number" min="0" value={formData.fats} onChange={handleInputChange} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
                {editingId ? "Update Meal" : "Add Meal"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <FilterGroup>
        <Filter
          label="Filter by Dietary Type"
          options={dietaryOptions}
          value={filter}
          onChange={setFilter}
          className="w-full max-w-xs"
        />
      </FilterGroup>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <Card key={meal.id} className="p-6">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Utensils className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{meal.name}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{meal.dietaryType}</span>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(meal)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMeal(meal.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mb-3 text-sm">{meal.description}</p>
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div className="rounded-md bg-gray-50 p-2">
                  <p className="font-medium">{meal.calories}</p>
                  <p className="text-xs text-gray-500">Calories</p>
                </div>
                <div className="rounded-md bg-gray-50 p-2">
                  <p className="font-medium">{meal.protein}g</p>
                  <p className="text-xs text-gray-500">Protein</p>
                </div>
                <div className="rounded-md bg-gray-50 p-2">
                  <p className="font-medium">{meal.carbs}g</p>
                  <p className="text-xs text-gray-500">Carbs</p>
                </div>
                <div className="rounded-md bg-gray-50 p-2">
                  <p className="font-medium">{meal.fats}g</p>
                  <p className="text-xs text-gray-500">Fats</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No meals found</p>
        )}
      </div>
    </div>
  )
}

