

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Flame, BarChart } from "lucide-react";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [workoutsRes, progressRes] = await Promise.all([
          fetch("http://localhost:8000/api/workouts"),
          fetch("http://localhost:8000/api/workout-progress/user", {
            credentials: "include",
          }),
        ]);

        if (!workoutsRes.ok || !progressRes.ok) {
          throw new Error("Failed to fetch workouts or progress");
        }

        const workoutsData = await workoutsRes.json();
        const progressData = await progressRes.json();

        setWorkouts(workoutsData);
        setProgressList(progressData.progress);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getWorkoutStatus = (workoutId) => {
    const progress = progressList.find((p) => p.workout === workoutId);
    if (progress) {
      return progress.isCompleted ? "completed" : "in-progress";
    }
    return "not-started";
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Filter by Category + Status
  const filteredWorkouts = workouts
    .filter((workout) => {
      if (filter === "all") return true;
      return workout.aim.toLowerCase() === filter;
    })
    .filter((workout) => {
      const status = getWorkoutStatus(workout._id);
      if (statusFilter === "all") return true;
      return statusFilter === status;
    })
    .sort((a, b) => {
      const statusA = getWorkoutStatus(a._id);
      const statusB = getWorkoutStatus(b._id);
      if (statusA === "completed" && statusB !== "completed") return 1;
      if (statusA !== "completed" && statusB === "completed") return -1;
      return 0;
    });

  return (
    <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] rounded-lg p-6 mb-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Workouts</h1>
          <p className="mt-2">Find the perfect workout for your fitness journey</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {["all", "strength", "cardio", "flexibility"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                filter === category
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {["all", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                statusFilter === status
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              {status === "all" ? "All Workouts" : status.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Workout Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => {
              const status = getWorkoutStatus(workout._id);
              return (
                <Link
                  to={`/workout/${workout._id}`}
                  key={workout._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#ECECEE]"
                >
                  <div className="relative">
                    <img
                      src={workout.thumbnail || "/placeholder.svg"}
                      alt={workout.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {workout.aim}
                    </div>

                    {/* Difficulty badge */}
                    <div
                      className={`absolute top-2 right-2 ${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold px-2 py-1 rounded-full`}
                    >
                      {workout.difficulty}
                    </div>

                    {/* Progress badge */}
                    {status === "completed" && (
                      <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Completed ✅
                      </div>
                    )}
                    {status === "in-progress" && (
                      <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        In Progress ⏳
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#0E0E2C] mb-3">{workout.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workout.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-[#0E0E2C]">
                        <Clock className="h-4 w-4 mr-1 text-[#00A8FF]" />
                        <span className="text-sm">{workout.duration} min</span>
                      </div>
                      <div className="flex items-center text-[#0E0E2C]">
                        <Flame className="h-4 w-4 mr-1 text-[#00A8FF]" />
                        <span className="text-sm">{workout.calorie} kcal</span>
                      </div>
                      <div className="flex items-center text-[#0E0E2C]">
                        <BarChart className="h-4 w-4 mr-1 text-[#00A8FF]" />
                        <span className="text-sm">{workout.time} hr</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredWorkouts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-[#ECECEE]">
            <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">No workouts found</h3>
            <p className="text-gray-600">Try selecting a different category or status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
