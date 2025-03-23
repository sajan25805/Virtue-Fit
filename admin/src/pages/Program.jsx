
"use client"

import { useState } from "react"
import { useProgramStore } from "../store/program-store"
import { useWorkoutStore } from "../store/workout-store"
import { useMealStore } from "../store/meal-store"
import { useMeditationStore } from "../store/meditation-store"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Layers, Edit, Trash, Plus, X, Dumbbell, Utensils, Wind } from "lucide-react"

export function ProgramManagement() {
  const { programs, addProgram, updateProgram, deleteProgram } = useProgramStore()
  const { workouts } = useWorkoutStore()
  const { meals } = useMealStore()
  const { meditations } = useMeditationStore()

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: false,
    workoutIds: [],
    mealIds: [],
    meditationIds: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleItemSelection = (type, id) => {
    setFormData((prev) => {
      const currentIds = [...prev[type]]
      if (currentIds.includes(id)) {
        return { ...prev, [type]: currentIds.filter((itemId) => itemId !== id) }
      } else {
        return { ...prev, [type]: [...currentIds, id] }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateProgram(editingId, { ...formData })
      setEditingId(null)
    } else {
      addProgram({
        ...formData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      })
    }
    setIsAdding(false)
    setFormData({
      name: "",
      description: "",
      active: false,
      workoutIds: [],
      mealIds: [],
      meditationIds: [],
    })
  }

  const handleEdit = (program) => {
    setFormData({
      name: program.name,
      description: program.description,
      active: program.active,
      workoutIds: program.workoutIds || [],
      mealIds: program.mealIds || [],
      meditationIds: program.meditationIds || [],
    })
    setEditingId(program.id)
    setIsAdding(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Program Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              name: "",
              description: "",
              active: false,
              workoutIds: [],
              mealIds: [],
              meditationIds: [],
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Program
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Program" : "Add New Program"}</h2>
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
                Program Name
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-[#00A8FF] focus:ring-[#00A8FF]"
              />
              <label htmlFor="active" className="text-sm font-medium">
                Active Program
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium">Select Workouts</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className={`flex cursor-pointer items-center rounded-md border p-3 ${
                      formData.workoutIds.includes(workout.id) ? "border-[#00A8FF] bg-blue-50" : "border-[#ECECEE]"
                    }`}
                    onClick={() => handleItemSelection("workoutIds", workout.id)}
                  >
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-medium">{workout.name}</p>
                      <p className="text-xs text-gray-500">{workout.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium">Select Meals</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    className={`flex cursor-pointer items-center rounded-md border p-3 ${
                      formData.mealIds.includes(meal.id) ? "border-[#00A8FF] bg-blue-50" : "border-[#ECECEE]"
                    }`}
                    onClick={() => handleItemSelection("mealIds", meal.id)}
                  >
                    <Utensils className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-xs text-gray-500">{meal.dietaryType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium">Select Meditations</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {meditations.map((meditation) => (
                  <div
                    key={meditation.id}
                    className={`flex cursor-pointer items-center rounded-md border p-3 ${
                      formData.meditationIds.includes(meditation.id)
                        ? "border-[#00A8FF] bg-blue-50"
                        : "border-[#ECECEE]"
                    }`}
                    onClick={() => handleItemSelection("meditationIds", meditation.id)}
                  >
                    <Wind className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-medium">{meditation.name}</p>
                      <p className="text-xs text-gray-500">{meditation.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
                {editingId ? "Update Program" : "Add Program"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {programs.length > 0 ? (
          programs.map((program) => {
            const programWorkouts = workouts.filter((w) => program.workoutIds?.includes(w.id))
            const programMeals = meals.filter((m) => program.mealIds?.includes(m.id))
            const programMeditations = meditations.filter((m) => program.meditationIds?.includes(m.id))

            return (
              <Card key={program.id} className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{program.name}</h3>
                    {program.active && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">Active</span>
                    )}
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(program)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProgram(program.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mb-4 text-sm">{program.description}</p>

                <div className="space-y-3">
                  {programWorkouts.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Workouts</h4>
                      <div className="flex flex-wrap gap-2">
                        {programWorkouts.map((workout) => (
                          <span key={workout.id} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                            {workout.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {programMeals.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Meals</h4>
                      <div className="flex flex-wrap gap-2">
                        {programMeals.map((meal) => (
                          <span key={meal.id} className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                            {meal.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {programMeditations.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Meditations</h4>
                      <div className="flex flex-wrap gap-2">
                        {programMeditations.map((meditation) => (
                          <span
                            key={meditation.id}
                            className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600"
                          >
                            {meditation.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">No programs found</p>
        )}
      </div>
    </div>
  )
}

