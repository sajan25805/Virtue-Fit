"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Clock, Edit, Trash2, Play } from "lucide-react"
import useStore from "../store/store"

const WorkoutsPage = () => {
  const { workouts, deleteWorkout } = useStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.aim.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Workouts</h1>
        <Link
          to="/workouts/new"
          className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
        >
          <Plus size={18} />
          <span>Add Workout</span>
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary/40" />
        </div>
        <input
          type="text"
          placeholder="Search workouts..."
          className="pl-10 pr-4 py-2 w-full border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-40 bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="p-4 bg-secondary rounded-full text-white hover:bg-secondary/90 transition-colors">
                  <Play className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-white">{workout.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      workout.difficulty === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : workout.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {workout.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-primary/60">
                <Clock className="h-4 w-4" />
                <span>{workout.duration}</span>
              </div>

              <p className="mt-2 text-sm text-primary">{workout.description}</p>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-primary mb-2">Aim</h4>
                <p className="text-sm text-primary/80">{workout.aim}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-primary mb-2">Steps</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {workout.steps.map((step, index) => (
                    <li key={index} className="text-sm text-primary/80">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-secondary flex justify-between items-center">
                <div className="text-xs text-primary/60">Video: {workout.videoUrl.split("/").pop()}</div>
                <div className="flex gap-2">
                  <Link
                    to={`/workouts/${workout.id}`}
                    className="p-1 text-primary/70 hover:text-secondary transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    className="p-1 text-primary/70 hover:text-red-500 transition-colors"
                    onClick={() => deleteWorkout(workout.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutsPage

