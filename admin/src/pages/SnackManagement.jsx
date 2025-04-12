"use client"

import { useSnackStore } from "../store/snack-store"; // Assuming you have a snack store
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Edit, Trash, Plus, X } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function SnackManagement() {
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    thumbnail: null,
    recipes: "",
    ingredients: "",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  })

  const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"))
  const trainerId = trainer?._id

  const { snacks, loading: snackLoading, error, fetchSnacks, addSnack, updateSnack, deleteSnack } = useSnackStore()

  useEffect(() => {
    if (trainerId) {
      fetchSnacks()
    }
  }, [fetchSnacks, trainerId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!trainerId) {
      console.error("No trainer ID found - user might not be logged in")
      return
    }

    try {
      const snackData = new FormData()

      snackData.append("title", formData.title)
      snackData.append("description", formData.description)
      snackData.append("calories", formData.calories.toString())
      snackData.append("protein", formData.protein.toString())
      snackData.append("carbs", formData.carbs.toString())
      snackData.append("fats", formData.fats.toString())
      snackData.append("trainer", trainerId)
      snackData.append("trainerName", trainer?.name || "")

      if (formData.ingredients) snackData.append("ingredients", formData.ingredients)
      if (formData.recipes) snackData.append("recipes", formData.recipes)

      snackData.append("isVegetarian", formData.isVegetarian)
      snackData.append("isVegan", formData.isVegan)
      snackData.append("isGlutenFree", formData.isGlutenFree)

      if (formData.thumbnail) snackData.append("thumbnail", formData.thumbnail)

      if (editingId) {
        await updateSnack(editingId, snackData)
      } else {
        await addSnack(snackData)
      }

      resetForm()
    } catch (error) {
      console.error("Error submitting snack:", error)
    }
  }

  const handleEdit = (snack) => {
    setIsAdding(true)
    setEditingId(snack._id)
    setFormData({
      title: snack.title || "",
      description: snack.description || "",
      calories: snack.calories || 0,
      protein: snack.protein || 0,
      carbs: snack.carbs || 0,
      fats: snack.fats || 0,
      thumbnail: null,
      recipes: Array.isArray(snack.recipes) ? snack.recipes.join("\n") : snack.recipes || "",
      ingredients: Array.isArray(snack.ingredients) ? snack.ingredients.join("\n") : snack.ingredients || "",
      isVegetarian: snack.isVegetarian || false,
      isVegan: snack.isVegan || false,
      isGlutenFree: snack.isGlutenFree || false,
    })
  }

  const resetForm = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      thumbnail: null,
      recipes: "",
      ingredients: "",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    })
  }

  if (!trainerId) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">You need to be logged in as a trainer to manage snacks.</p>
        <Button onClick={() => navigate("/trainer/login")} className="bg-[#00A8FF] hover:bg-[#0096E6]">
          Go to Login
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Snack Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              title: "",
              description: "",
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
              thumbnail: null,
              recipes: "",
              ingredients: "",
              isVegetarian: false,
              isVegan: false,
              isGlutenFree: false,
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
          disabled={snackLoading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Snack
        </Button>
      </div>

      {error && <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Snack" : "Add New Snack"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm} disabled={snackLoading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={snackLoading}
              />
            </div>
            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
                disabled={snackLoading}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={formData.calories}
                  onChange={handleInputChange}
                  required
                  disabled={snackLoading}
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (grams)</Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  value={formData.protein}
                  onChange={handleInputChange}
                  required
                  disabled={snackLoading}
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (grams)</Label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  required
                  disabled={snackLoading}
                />
              </div>
              <div>
                <Label htmlFor="fats">Fats (grams)</Label>
                <Input
                  id="fats"
                  name="fats"
                  type="number"
                  value={formData.fats}
                  onChange={handleInputChange}
                  required
                  disabled={snackLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="isVegetarian">Vegetarian</Label>
                <Input
                  id="isVegetarian"
                  name="isVegetarian"
                  type="checkbox"
                  checked={formData.isVegetarian}
                  onChange={handleCheckboxChange}
                  disabled={snackLoading}
                />
              </div>
              <div>
                <Label htmlFor="isVegan">Vegan</Label>
                <Input
                  id="isVegan"
                  name="isVegan"
                  type="checkbox"
                  checked={formData.isVegan}
                  onChange={handleCheckboxChange}
                  disabled={snackLoading}
                />
              </div>
              <div>
                <Label htmlFor="isGlutenFree">Gluten-Free</Label>
                <Input
                  id="isGlutenFree"
                  name="isGlutenFree"
                  type="checkbox"
                  checked={formData.isGlutenFree}
                  onChange={handleCheckboxChange}
                  disabled={snackLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                disabled={snackLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients (Markdown)</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                value={Array.isArray(formData.ingredients) ? formData.ingredients.join("\n") : formData.ingredients}
                onChange={(e) => setFormData((prev) => ({ ...prev, ingredients: e.target.value }))}
                placeholder="Enter ingredients in markdown format"
                rows={5}
                disabled={snackLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipes">Recipes (Markdown)</Label>
              <Textarea
                id="recipes"
                name="recipes"
                value={Array.isArray(formData.recipes) ? formData.recipes.join("\n") : formData.recipes}
                onChange={(e) => setFormData((prev) => ({ ...prev, recipes: e.target.value }))}
                placeholder="Enter recipe steps in markdown format"
                rows={8}
                disabled={snackLoading}
              />
            </div>

            <Button type="submit" className="w-full bg-[#00A8FF] hover:bg-[#0096E6]" disabled={snackLoading}>
              {editingId ? "Update Snack" : "Add Snack"}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {snacks.map((snack) => (
          <Card key={snack._id} className="relative p-4">
            <div className="absolute top-0 right-0 space-x-2">
              <Button variant="ghost" onClick={() => handleEdit(snack)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => deleteSnack(snack._id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img src={snack.thumbnail || "/placeholder.svg"} alt={snack.title} className="w-full h-40 object-cover" />
            <div className="mt-4">
              <h3 className="font-semibold">{snack.title}</h3>
              <p className="text-sm text-gray-500">{snack.description}</p>
            </div>
            {snack.ingredients && snack.ingredients.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-semibold text-gray-700">INGREDIENTS</h4>
                <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
                  {snack.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                  {snack.ingredients.length > 3 && <li className="italic">+{snack.ingredients.length - 3} more</li>}
                </ul>
              </div>
            )}
            {snack.recipes && snack.recipes.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs font-semibold text-gray-700">RECIPE</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {snack.recipes.length} step{snack.recipes.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}