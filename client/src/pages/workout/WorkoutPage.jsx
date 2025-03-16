
"use client"

import { useState } from "react"
import { ClockIcon, FireIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import workout from "../../assets/workout.jpg"

const workouts = [
  {
    id: 1,
    title: "Full Body Strength",
    duration: "45 min",
    calories: "320 kcal",
    level: "Intermediate",
image:`${workout}`,
category: "strength",
  },
  {
    id: 2,
    title: "HIIT Cardio Blast",
    duration: "30 min",
    calories: "400 kcal",
    level: "Advanced",
    image:`${workout}`,
    category: "cardio",
  },
  {
    id: 3,
    title: "Core Crusher",
    duration: "25 min",
    calories: "220 kcal",
    level: "Beginner",
    image:`${workout}`,
    category: "strength",
  },
  {
    id: 4,
    title: "Yoga Flow",
    duration: "60 min",
    calories: "180 kcal",
    level: "All Levels",
    image:`${workout}`,
    category: "flexibility",
  },
  {
    id: 5,
    title: "Tabata Training",
    duration: "20 min",
    calories: "280 kcal",
    level: "Intermediate",
    image:`${workout}`,
    category: "cardio",
  },
  {
    id: 6,
    title: "Stretch & Recover",
    duration: "30 min",
    calories: "120 kcal",
    level: "All Levels",
    image:`${workout}`,
    category: "flexibility",
  },
]

const WorkoutPage = () => {
  const [filter, setFilter] = useState("all")

  const filteredWorkouts = filter === "all" ? workouts : workouts.filter((workout) => workout.category === filter)

  return (
    <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] rounded-lg p-6 mb-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Workouts</h1>
          <p className="mt-2">Find the perfect workout for your fitness journey</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-nowrap space-x-2 pb-2 md:flex-wrap md:justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
                filter === "all"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              All Workouts
            </button>
            <button
              onClick={() => setFilter("strength")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
                filter === "strength"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              Strength
            </button>
            <button
              onClick={() => setFilter("cardio")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
                filter === "cardio"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              Cardio
            </button>
            <button
              onClick={() => setFilter("flexibility")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
                filter === "flexibility"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              Flexibility
            </button>
          </div>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#ECECEE]"
            >
              <div className="relative">
                <img
                  src={workout.image || "/placeholder.svg"}
                  alt={workout.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {workout.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#0E0E2C] mb-3">{workout.title}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-[#0E0E2C]">
                    <ClockIcon className="h-4 w-4 mr-1 text-[#00A8FF]" />
                    <span className="text-sm">{workout.duration}</span>
                  </div>
                  <div className="flex items-center text-[#0E0E2C]">
                    <FireIcon className="h-4 w-4 mr-1 text-[#00A8FF]" />
                    <span className="text-sm">{workout.calories}</span>
                  </div>
                  <div className="flex items-center text-[#0E0E2C]">
                    <ChartBarIcon className="h-4 w-4 mr-1 text-[#00A8FF]" />
                    <span className="text-sm">{workout.level}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium">
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkouts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-[#ECECEE]">
            <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">No workouts found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkoutPage

