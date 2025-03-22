"use client"

import { useWorkoutStore } from "../store/workout-store"
import { useMealStore } from "../store/meal-store"
import { useMeditationStore } from "../store/meditation-store"
import { useProgramStore } from "../store/program-store"
import { Card } from "../components/ui/card"
import { Dumbbell, Utensils, Wind, Layers } from "lucide-react"

export function DashboardOverview() {
  const workouts = useWorkoutStore((state) => state.workouts)
  const meals = useMealStore((state) => state.meals)
  const meditations = useMeditationStore((state) => state.meditations)
  const programs = useProgramStore((state) => state.programs)

  const stats = [
    {
      title: "Workouts Created",
      value: workouts.length,
      icon: Dumbbell,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Meals Added",
      value: meals.length,
      icon: Utensils,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Meditations Available",
      value: meditations.length,
      icon: Wind,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Programs Designed",
      value: programs.length,
      icon: Layers,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const activePrograms = programs.filter((program) => program.active)
  const recentWorkouts = [...workouts].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center">
              <div className={`rounded-full p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Active Programs</h2>
          {activePrograms.length > 0 ? (
            <div className="space-y-4">
              {activePrograms.map((program) => (
                <div key={program.id} className="rounded-lg border border-[#ECECEE] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{program.name}</h3>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">Active</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{program.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No active programs</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Workouts</h2>
          {recentWorkouts.length > 0 ? (
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="rounded-lg border border-[#ECECEE] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{workout.name}</h3>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        workout.difficulty === "Easy"
                          ? "bg-green-100 text-green-600"
                          : workout.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{workout.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent workouts</p>
          )}
        </Card>
      </div>
    </div>
  )
}
