"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Clock, Flame, BarChart, Calendar, CheckCircle, Mail, Award } from "lucide-react"

const WorkoutDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/workouts/${id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch workout details: ${response.status}`)
        }

        const data = await response.json()
        setWorkout(data)
      } catch (err) {
        console.error("Error fetching workout details:", err)
        setError("Failed to load workout details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchWorkoutDetails()
    }
  }, [id])

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Function to get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-blue-500"

    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F7FD]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
      </div>
    )
  }

  if (error || !workout) {
    return (
      <div className="container mx-auto px-4 py-8 bg-[#F7F7FD] min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error || "Workout not found"}</span>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center text-[#0E0E2C] hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to workouts
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#F7F7FD] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/workout" className="flex items-center text-[#0E0E2C] hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to workouts
        </Link>

        {/* Workout header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img
              src={workout.thumbnail || "/placeholder.svg"}
              alt={workout.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <span
                  className={`${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold px-2 py-1 rounded-full`}
                >
                  {workout.difficulty}
                </span>
                <span className="bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">{workout.aim}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{workout.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Video section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="aspect-video">
                <video
                  src={workout.videoUrl}
                  controls
                  poster={workout.thumbnail}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Workout details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0E0E2C] mb-4">Workout Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Clock className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Duration</span>
                  <span className="font-semibold">{workout.duration} min</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Flame className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Calories</span>
                  <span className="font-semibold">{workout.calorie} kcal</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <BarChart className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="font-semibold">{workout.time} hr</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Calendar className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="font-semibold text-xs">{formatDate(workout.createdAt)}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">Description</h3>
              <p className="text-gray-700 mb-6">{workout.description}</p>

              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-3 px-8 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {workout.isCompleted ? "Completed" : "Mark as Completed"}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trainer info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Trainer</h2>
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={workout.trainer.profilePicture || "/placeholder.svg"}
                    alt={workout.trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#0E0E2C]">{workout.trainer.name}</h3>
                <span className="bg-[#F7F7FD] text-[#00A8FF] text-xs font-bold px-2 py-1 rounded-full mb-4">
                  {workout.trainer.specialization}
                </span>

                <div className="w-full space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-[#00A8FF]" />
                    <span className="text-sm">{workout.trainer.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Award className="h-4 w-4 mr-2 text-[#00A8FF]" />
                    <span className="text-sm">Certified {workout.trainer.specialization} Trainer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related workouts placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Similar Workouts</h2>
              <p className="text-gray-500 text-sm">More {workout.aim} workouts coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutDetailPage
