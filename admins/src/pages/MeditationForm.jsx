"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import useStore from "../store/store"
import { v4 as uuidv4 } from "uuid"

const MeditationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { meditations, addMeditation, updateMeditation } = useStore()

  const isEditMode = id !== "new"

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    audioUrl: "",
    category: "",
    level: "",
  })

  useEffect(() => {
    if (isEditMode) {
      const meditation = meditations.find((m) => m.id === id)
      if (meditation) {
        setFormData({
          title: meditation.title,
          description: meditation.description,
          duration: meditation.duration,
          audioUrl: meditation.audioUrl,
          category: meditation.category,
          level: meditation.level,
        })
      }
    }
  }, [isEditMode, id, meditations])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const meditationData = {
      ...formData,
    }

    if (isEditMode) {
      updateMeditation(id, meditationData)
    } else {
      addMeditation({
        id: uuidv4(),
        ...meditationData,
      })
    }

    navigate("/meditations")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/meditations")}
          className="p-2 rounded-lg hover:bg-neutral-secondary/30 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <h1 className="text-2xl font-bold text-primary">{isEditMode ? "Edit Meditation" : "Add New Meditation"}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-primary">
                Meditation Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Enter meditation title"
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
                placeholder="e.g. 10 minutes"
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
              placeholder="Enter meditation description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-primary">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="e.g. Mindfulness, Sleep, Recovery"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-primary">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="audioUrl" className="block text-sm font-medium text-primary">
              Audio URL
            </label>
            <input
              type="text"
              id="audioUrl"
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter audio file URL"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
            >
              <Save size={18} />
              <span>{isEditMode ? "Update Meditation" : "Save Meditation"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MeditationForm

