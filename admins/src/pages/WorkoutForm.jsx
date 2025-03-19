"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import useStore from "../store/store"
import { v4 as uuidv4 } from "uuid"

const WorkoutForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts, addWorkout, updateWorkout } = useStore()

  const isEditMode = id !== "new"

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    duration: "",
    videoUrl: "",
    aim: "",
    steps: [""],
  })

  useEffect(() => {
    if (isEditMode) {
      const workout = workouts.find((w) => w.id === id)
      if (workout) {
        setFormData({
          title: workout.title,
          description: workout.description,
          difficulty: workout.difficulty,
          duration: workout.duration,
          videoUrl: workout.videoUrl,
          aim: workout.aim,
          steps: [...workout.steps],
        })
      }
    }
  }, [isEditMode, id, workouts])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStepChange = (index, value) => {
    setFormData((prev) => {
      const newSteps = [...prev.steps]
      newSteps[index] = value
      return {
        ...prev,
        steps: newSteps,
      }
    })
  }

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }))
  }

  const removeStep = (index) => {
    setFormData((prev) => {
      const newSteps = [...prev.steps]
      newSteps.splice(index, 1)
      return {
        ...prev,
        steps: newSteps,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const workoutData = {
      ...formData,
      steps: formData.steps.filter((step) => step.trim() !== ""),
    }

    if (isEditMode) {
      updateWorkout(id, workoutData)
    } else {
      addWorkout({
        id: uuidv4(),
        ...workoutData,
      })
    }

    navigate("/workouts")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/workouts")}
          className="p-2 rounded-lg hover:bg-neutral-secondary/30 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <h1 className="text-2xl font-bold text-primary">{isEditMode ? "Edit Workout" : "Add New Workout"}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-primary">
                Workout Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter workout title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-medium text-primary">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter workout duration"
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
              placeholder="Enter workout description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="difficulty" className="block text-sm font-medium text-primary">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <option value="">Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="videoUrl" className="block text-sm font-medium text-primary">
                Video URL
              </label>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter video URL"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="aim" className="block text-sm font-medium text-primary">
              Aim
            </label>
            <input
              type="text"
              id="aim"
              name="aim"
              value={formData.aim}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter workout aim"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-primary">Steps</label>
              <button
                type="button"
                onClick={addStep}
                className="p-1 text-secondary hover:text-secondary/80 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder={`Step ${index + 1}`}
                />
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="p-1 text-primary/60 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
            >
              <Save size={18} />
              <span>{isEditMode ? "Update Workout" : "Save Workout"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkoutForm

