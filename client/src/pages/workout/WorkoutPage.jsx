
// // "use client"

// // import { useState } from "react"
// // import { ClockIcon, FireIcon, ChartBarIcon } from "@heroicons/react/24/outline";
// // import workout from "../../assets/workout.jpg"

// // const workouts = [
// //   {
// //     id: 1,
// //     title: "Full Body Strength",
// //     duration: "45 min",
// //     calories: "320 kcal",
// //     level: "Intermediate",
// // image:`${workout}`,
// // category: "strength",
// //   },
// //   {
// //     id: 2,
// //     title: "HIIT Cardio Blast",
// //     duration: "30 min",
// //     calories: "400 kcal",
// //     level: "Advanced",
// //     image:`${workout}`,
// //     category: "cardio",
// //   },
// //   {
// //     id: 3,
// //     title: "Core Crusher",
// //     duration: "25 min",
// //     calories: "220 kcal",
// //     level: "Beginner",
// //     image:`${workout}`,
// //     category: "strength",
// //   },
// //   {
// //     id: 4,
// //     title: "Yoga Flow",
// //     duration: "60 min",
// //     calories: "180 kcal",
// //     level: "All Levels",
// //     image:`${workout}`,
// //     category: "flexibility",
// //   },
// //   {
// //     id: 5,
// //     title: "Tabata Training",
// //     duration: "20 min",
// //     calories: "280 kcal",
// //     level: "Intermediate",
// //     image:`${workout}`,
// //     category: "cardio",
// //   },
// //   {
// //     id: 6,
// //     title: "Stretch & Recover",
// //     duration: "30 min",
// //     calories: "120 kcal",
// //     level: "All Levels",
// //     image:`${workout}`,
// //     category: "flexibility",
// //   },
// // ]

// // const WorkoutPage = () => {
// //   const [filter, setFilter] = useState("all")

// //   const filteredWorkouts = filter === "all" ? workouts : workouts.filter((workout) => workout.category === filter)

// //   return (
// //     <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
// //       <div className="container mx-auto">
// //         {/* Header Section */}
// //         <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] rounded-lg p-6 mb-8 text-white">
// //           <h1 className="text-2xl md:text-3xl font-bold">Workouts</h1>
// //           <p className="mt-2">Find the perfect workout for your fitness journey</p>
// //         </div>

// //         {/* Filter Buttons */}
// //         <div className="mb-8 overflow-x-auto">
// //           <div className="flex flex-nowrap space-x-2 pb-2 md:flex-wrap md:justify-center">
// //             <button
// //               onClick={() => setFilter("all")}
// //               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
// //                 filter === "all"
// //                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
// //                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
// //               }`}
// //             >
// //               All Workouts
// //             </button>
// //             <button
// //               onClick={() => setFilter("strength")}
// //               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
// //                 filter === "strength"
// //                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
// //                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
// //               }`}
// //             >
// //               Strength
// //             </button>
// //             <button
// //               onClick={() => setFilter("cardio")}
// //               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
// //                 filter === "cardio"
// //                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
// //                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
// //               }`}
// //             >
// //               Cardio
// //             </button>
// //             <button
// //               onClick={() => setFilter("flexibility")}
// //               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
// //                 filter === "flexibility"
// //                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
// //                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
// //               }`}
// //             >
// //               Flexibility
// //             </button>
// //           </div>
// //         </div>

// //         {/* Workout Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredWorkouts.map((workout) => (
// //             <div
// //               key={workout.id}
// //               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#ECECEE]"
// //             >
// //               <div className="relative">
// //                 <img
// //                   src={workout.image || "/placeholder.svg"}
// //                   alt={workout.title}
// //                   className="w-full h-48 object-cover"
// //                 />
// //                 <div className="absolute top-2 right-2 bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">
// //                   {workout.category}
// //                 </div>
// //               </div>
// //               <div className="p-5">
// //                 <h3 className="text-xl font-semibold text-[#0E0E2C] mb-3">{workout.title}</h3>
// //                 <div className="flex flex-wrap gap-4 mb-4">
// //                   <div className="flex items-center text-[#0E0E2C]">
// //                     <ClockIcon className="h-4 w-4 mr-1 text-[#00A8FF]" />
// //                     <span className="text-sm">{workout.duration}</span>
// //                   </div>
// //                   <div className="flex items-center text-[#0E0E2C]">
// //                     <FireIcon className="h-4 w-4 mr-1 text-[#00A8FF]" />
// //                     <span className="text-sm">{workout.calories}</span>
// //                   </div>
// //                   <div className="flex items-center text-[#0E0E2C]">
// //                     <ChartBarIcon className="h-4 w-4 mr-1 text-[#00A8FF]" />
// //                     <span className="text-sm">{workout.level}</span>
// //                   </div>
// //                 </div>
// //                 <button className="w-full bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium">
// //                   Start Workout
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Empty State */}
// //         {filteredWorkouts.length === 0 && (
// //           <div className="bg-white rounded-lg shadow-md p-8 text-center border border-[#ECECEE]">
// //             <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">No workouts found</h3>
// //             <p className="text-gray-600">Try selecting a different category</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default WorkoutPage





// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { Clock, Flame, BarChart } from "lucide-react"

// const WorkoutPage = () => {
//   const [workouts, setWorkouts] = useState([])
//   const [filter, setFilter] = useState("all")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("http://localhost:8000/api/workouts")

//         if (!response.ok) {
//           throw new Error(`Failed to fetch workouts: ${response.status}`)
//         }

//         const data = await response.json()
//         setWorkouts(data)
//       } catch (err) {
//         console.error("Error fetching workouts:", err)
//         setError("Failed to load workouts. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchWorkouts()
//   }, [])

//   // Filter workouts based on selected aim/category
//   const filteredWorkouts =
//     filter === "all" ? workouts : workouts.filter((workout) => workout.aim.toLowerCase() === filter)

//   // Function to get difficulty badge color
//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty.toLowerCase()) {
//       case "easy":
//         return "bg-green-500"
//       case "medium":
//         return "bg-yellow-500"
//       case "hard":
//         return "bg-red-500"
//       default:
//         return "bg-blue-500"
//     }
//   }

//   return (
//     <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
//       <div className="container mx-auto">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] rounded-lg p-6 mb-8 text-white">
//           <h1 className="text-2xl md:text-3xl font-bold">Workouts</h1>
//           <p className="mt-2">Find the perfect workout for your fitness journey</p>
//         </div>

//         {/* Filter Buttons */}
//         <div className="mb-8 overflow-x-auto">
//           <div className="flex flex-nowrap space-x-2 pb-2 md:flex-wrap md:justify-center">
//             <button
//               onClick={() => setFilter("all")}
//               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
//                 filter === "all"
//                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
//                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
//               }`}
//             >
//               All Workouts
//             </button>
//             <button
//               onClick={() => setFilter("strength")}
//               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
//                 filter === "strength"
//                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
//                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
//               }`}
//             >
//               Strength
//             </button>
//             <button
//               onClick={() => setFilter("cardio")}
//               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
//                 filter === "cardio"
//                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
//                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
//               }`}
//             >
//               Cardio
//             </button>
//             <button
//               onClick={() => setFilter("flexibility")}
//               className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
//                 filter === "flexibility"
//                   ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
//                   : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
//               }`}
//             >
//               Flexibility
//             </button>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         {/* Workout Cards */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredWorkouts.map((workout) => (
//               <Link
//                 to={`/workout/${workout._id}`}
//                 key={workout._id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#ECECEE]"
//               >
//                 <div className="relative">
//                   <div className="w-full h-48 relative">
//                     <img
//                       src={workout.thumbnail || "/placeholder.svg"}
//                       alt={workout.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div
//                     className={`absolute top-2 right-2 ${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold px-2 py-1 rounded-full`}
//                   >
//                     {workout.difficulty}
//                   </div>
//                   <div className="absolute top-2 left-2 bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">
//                     {workout.aim}
//                   </div>
//                 </div>
//                 <div className="p-5">
//                   <h3 className="text-xl font-semibold text-[#0E0E2C] mb-3">{workout.title}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workout.description}</p>
//                   <div className="flex flex-wrap gap-4 mb-4">
//                     <div className="flex items-center text-[#0E0E2C]">
//                       <Clock className="h-4 w-4 mr-1 text-[#00A8FF]" />
//                       <span className="text-sm">{workout.duration} min</span>
//                     </div>
//                     <div className="flex items-center text-[#0E0E2C]">
//                       <Flame className="h-4 w-4 mr-1 text-[#00A8FF]" />
//                       <span className="text-sm">{workout.calorie} kcal</span>
//                     </div>
//                     <div className="flex items-center text-[#0E0E2C]">
//                       <BarChart className="h-4 w-4 mr-1 text-[#00A8FF]" />
//                       <span className="text-sm">{workout.time} hr</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center mt-4">
//                     <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden">
//                       <img
//                         src={workout.trainer.profilePicture || "/placeholder.svg"}
//                         alt={workout.trainer.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium">{workout.trainer.name}</p>
//                       <p className="text-xs text-gray-500">{workout.trainer.specialization}</p>
//                     </div>
//                   </div>
//                   <button className="w-full mt-4 bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium">
//                     Start Workout
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && filteredWorkouts.length === 0 && (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center border border-[#ECECEE]">
//             <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">No workouts found</h3>
//             <p className="text-gray-600">Try selecting a different category</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default WorkoutPage



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
