"use client"

import { useMeditationStore } from "../store/meditation-store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Edit, Trash, Plus, X } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function MeditationManagement() {
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 0,
    audioUrl: null,
    thumbnail: null,
    category: "Mindfulness",
    level: "Beginner"
  })

  const trainer = localStorage.getItem("trainer") && JSON.parse(localStorage.getItem("trainer"))
  const trainerId = trainer?._id

  const { meditations, loading, error, fetchMeditations, addMeditation, updateMeditation, deleteMeditation } = useMeditationStore()

  useEffect(() => {
    if (trainerId) {
      fetchMeditations()
    }
  }, [fetchMeditations, trainerId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      const meditationData = new FormData()

      meditationData.append("title", formData.title)
      meditationData.append("description", formData.description)
      meditationData.append("duration", formData.duration.toString())
      meditationData.append("category", formData.category)
      meditationData.append("level", formData.level)
      meditationData.append("trainer", trainerId)
      meditationData.append("trainerName", trainer?.name || "")

      if (formData.audioUrl) meditationData.append("audioUrl", formData.audioUrl)
      if (formData.thumbnail) meditationData.append("thumbnail", formData.thumbnail)

      if (editingId) {
        await updateMeditation(editingId, meditationData)
      } else {
        await addMeditation(meditationData)
      }

      resetForm()
    } catch (error) {
      console.error("Error submitting meditation:", error)
    }
  }

  const handleEdit = (meditation) => {
    setIsAdding(true)
    setEditingId(meditation._id)
    setFormData({
      title: meditation.title || "",
      description: meditation.description || "",
      duration: meditation.duration || 0,
      category: meditation.category || "Mindfulness",
      level: meditation.level || "Beginner",
      audioUrl: null,
      thumbnail: null
    })
  }

  const resetForm = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      duration: 0,
      audioUrl: null,
      thumbnail: null,
      category: "Mindfulness",
      level: "Beginner"
    })
  }

  if (!trainerId) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">You need to be logged in as a trainer to manage meditations.</p>
        <Button onClick={() => navigate("/trainer/login")} className="bg-[#00A8FF] hover:bg-[#0096E6]">
          Go to Login
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meditation Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              title: "",
              description: "",
              duration: 0,
              audioUrl: null,
              thumbnail: null,
              category: "Mindfulness",
              level: "Beginner"
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Meditation
        </Button>
      </div>

      {error && <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Meditation" : "Add New Meditation"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm} disabled={loading}>
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="duration">
                  Duration (minutes) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={loading}
                >
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Focus">Focus</option>
                  <option value="Breathing">Breathing</option>
                </select>
              </div>
              <div>
                <Label htmlFor="level">
                  Level <span className="text-red-500">*</span>
                </Label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={loading}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="audioUrl">
                Audio File <span className="text-red-500">*</span>
              </Label>
              <Input
                id="audioUrl"
                name="audioUrl"
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e, "audioUrl")}
                required={!editingId}
                disabled={loading}
              />
              {editingId && (
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to keep existing audio file
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                disabled={loading}
              />
              {editingId && (
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to keep existing thumbnail
                </p>
              )}
            </div>

            <Button type="submit" className="w-full bg-[#00A8FF] hover:bg-[#0096E6]" disabled={loading}>
              {editingId ? "Update Meditation" : "Add Meditation"}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meditations.map((meditation) => (
          <Card key={meditation._id} className="relative p-4">
            <div className="absolute top-0 right-0 space-x-2">
              <Button variant="ghost" onClick={() => handleEdit(meditation)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => deleteMeditation(meditation._id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img src={meditation.thumbnail || "/placeholder.svg"} alt={meditation.title} className="w-full h-40 object-cover" />
            <div className="mt-4">
              <h3 className="font-semibold">{meditation.title}</h3>
              <p className="text-sm text-gray-500">{meditation.description}</p>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Duration:</span>
                <span>{meditation.duration} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Category:</span>
                <span>{meditation.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Level:</span>
                <span>{meditation.level}</span>
              </div>
            </div>
            {meditation.audioUrl && (
              <div className="mt-4">
                <audio controls className="w-full">
                  <source src={meditation.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}