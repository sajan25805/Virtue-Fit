// // // ProgramPage.jsx
// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import toast from "react-hot-toast";

// // const ProgramPage = () => {
// //   const [programs, setPrograms] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [goalFilter, setGoalFilter] = useState("all");
// //   const [userProgress, setUserProgress] = useState({});
// //   const [startDateMap, setStartDateMap] = useState({});

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [programRes, progressRes] = await Promise.all([
// //           fetch("http://localhost:8000/api/programs"),
// //           fetch("http://localhost:8000/api/user/program-progress", {
// //             credentials: "include"
// //           }),
// //         ]);

// //         const programData = await programRes.json();
// //         const progressData = await progressRes.json();

// //         if (programData.success) setPrograms(programData.programs);
// //         if (progressData.success) {
// //           const progressMap = {};
// //           progressData.progress.forEach(p => {
// //             progressMap[p.program] = p;
// //           });
// //           setUserProgress(progressMap);
// //         }
// //       } catch (err) {
// //         toast.error("Error fetching programs");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleEnroll = async (programId) => {
// //     const startDate = startDateMap[programId] || new Date().toISOString().slice(0, 10);

// //     try {
// //       const res = await fetch(`http://localhost:8000/api/programs/${programId}/enroll`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ startDate }),
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         toast.success("Enrolled successfully!");
// //         setUserProgress(prev => ({ ...prev, [programId]: data.progress }));
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error("Enrollment failed");
// //     }
// //   };

// //   const filteredPrograms = goalFilter === "all"
// //     ? programs
// //     : programs.filter(p => p.goal.toLowerCase() === goalFilter.toLowerCase());

// //   return (
// //     <div className="bg-[#F7F7FD] min-h-screen px-4 py-10">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="text-center mb-10">
// //           <h1 className="text-3xl font-bold text-[#0E0E2C]">Programs</h1>
// //           <p className="text-gray-600 mt-2">Choose a fitness program that suits your goal</p>
// //         </div>

// //         <div className="flex justify-center gap-4 mb-8 flex-wrap">
// //           {["all", "strength", "weightloss", "cardio", "flexibility"].map((g) => (
// //             <button
// //               key={g}
// //               onClick={() => setGoalFilter(g)}
// //               className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
// //                 goalFilter === g
// //                   ? "bg-[#00A8FF] text-white"
// //                   : "bg-white text-[#0E0E2C] border-[#DDD] hover:bg-gray-100"
// //               }`}
// //             >
// //               {g.charAt(0).toUpperCase() + g.slice(1)}
// //             </button>
// //           ))}
// //         </div>

// //         {loading ? (
// //           <div className="text-center py-20">
// //             <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
// //             <p className="mt-4 text-sm text-gray-500">Loading programs...</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredPrograms.map((program) => {
// //               const progress = userProgress[program._id];
// //               const completedDays = progress?.completed?.length || 0;
// //               const totalDays = program?.days?.length || 0;

// //               return (
// //                 <div key={program._id} className="bg-white rounded-xl shadow border p-5 hover:shadow-lg transition">
// //                   <h3 className="text-xl font-bold text-[#0E0E2C] mb-1">{program.name}</h3>
// //                   <p className="text-sm text-gray-600 mb-2 capitalize">Goal: {program.goal}</p>
// //                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
// //                     <img src={program.trainer?.profilePicture} className="w-8 h-8 rounded-full" alt="trainer" />
// //                     <span>{program.trainer?.name} ({program.trainer?.specialization})</span>
// //                   </div>

// //                   {progress ? (
// //                     <div className="text-sm text-green-600 font-semibold mb-3">
// //                       Progress: {completedDays}/{totalDays} days
// //                     </div>
// //                   ) : (
// //                     <div className="mb-3">
// //                       <label className="text-sm text-gray-600">Start Date:</label>
// //                       <input
// //                         type="date"
// //                         className="block w-full mt-1 px-3 py-1 border rounded text-sm"
// //                         value={startDateMap[program._id] || ""}
// //                         onChange={(e) =>
// //                           setStartDateMap((prev) => ({
// //                             ...prev,
// //                             [program._id]: e.target.value,
// //                           }))
// //                         }
// //                       />
// //                     </div>
// //                   )}

// //                   <div className="flex justify-between items-center mt-4">
// //                     <Link
// //                       to={`/program/${program._id}`}
// //                       className="text-blue-500 text-sm hover:underline"
// //                     >
// //                       View Details
// //                     </Link>

// //                     {!progress ? (
// //                       <button
// //                         onClick={() => handleEnroll(program._id)}
// //                         className="bg-[#00A8FF] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600 transition"
// //                       >
// //                         Enroll
// //                       </button>
// //                     ) : (
// //                       <span className="text-green-600 text-sm font-medium">Enrolled ✅</span>
// //                     )}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProgramPage;




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// const ProgramPage = () => {
//   const [programs, setPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [goalFilter, setGoalFilter] = useState("all");
//   const [userProgress, setUserProgress] = useState({});
//   const [startDateMap, setStartDateMap] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const programRes = await fetch("http://localhost:8000/api/programs");
//         const programData = await programRes.json();

//         if (programData.success) {
//           setPrograms(programData.programs);

//           const progressResults = await Promise.all(
//             programData.programs.map((p) =>
//               fetch(`http://localhost:8000/api/programs/${p._id}/progress`, {
//                 credentials: "include",
//               }).then((res) => res.json())
//             )
//           );

//           const progressMap = {};
//           progressResults.forEach((result, index) => {
//             if (result.success) {
//               const programId = programData.programs[index]._id;
//               progressMap[programId] = result.progress;
//             }
//           });

//           setUserProgress(progressMap);
//         } else {
//           toast.error("Failed to fetch programs");
//         }
//       } catch (err) {
//         toast.error("Error fetching programs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEnroll = async (programId) => {
//     const startDate = startDateMap[programId] || new Date().toISOString().slice(0, 10);

//     try {
//       const res = await fetch(`http://localhost:8000/api/programs/${programId}/enroll`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ startDate }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Enrolled successfully!");
//         setUserProgress((prev) => ({ ...prev, [programId]: data.progress }));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Enrollment failed");
//     }
//   };

//   const filteredPrograms = goalFilter === "all"
//     ? programs
//     : programs.filter((p) => p.goal.toLowerCase() === goalFilter.toLowerCase());

//   return (
//     <div className="bg-[#F7F7FD] min-h-screen px-4 py-10">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-[#0E0E2C]">Programs</h1>
//           <p className="text-gray-600 mt-2">Choose a fitness program that suits your goal</p>
//         </div>

//         <div className="flex justify-center gap-4 mb-8 flex-wrap">
//           {["all", "strength", "weightloss", "cardio", "flexibility"].map((g) => (
//             <button
//               key={g}
//               onClick={() => setGoalFilter(g)}
//               className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
//                 goalFilter === g
//                   ? "bg-[#00A8FF] text-white"
//                   : "bg-white text-[#0E0E2C] border-[#DDD] hover:bg-gray-100"
//               }`}
//             >
//               {g.charAt(0).toUpperCase() + g.slice(1)}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
//             <p className="mt-4 text-sm text-gray-500">Loading programs...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPrograms.map((program) => {
//               const progress = userProgress[program._id];
//               const completedDays = progress?.completed?.length || 0;
//               const totalDays = program?.days?.length || 0;

//               return (
//                 <div key={program._id} className="bg-white rounded-xl shadow border p-5 hover:shadow-lg transition">
//                   <h3 className="text-xl font-bold text-[#0E0E2C] mb-1">{program.name}</h3>
//                   <p className="text-sm text-gray-600 mb-2 capitalize">Goal: {program.goal}</p>
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                     <img src={program.trainer?.profilePicture} className="w-8 h-8 rounded-full" alt="trainer" />
//                     <span>{program.trainer?.name} ({program.trainer?.specialization})</span>
//                   </div>

//                   {progress ? (
//                     <div className="text-sm text-green-600 font-semibold mb-3">
//                       Progress: {completedDays}/{totalDays * 4} items
//                     </div>
//                   ) : (
//                     <div className="mb-3">
//                       <label className="text-sm text-gray-600">Start Date:</label>
//                       <input
//                         type="date"
//                         className="block w-full mt-1 px-3 py-1 border rounded text-sm"
//                         value={startDateMap[program._id] || ""}
//                         onChange={(e) =>
//                           setStartDateMap((prev) => ({
//                             ...prev,
//                             [program._id]: e.target.value,
//                           }))
//                         }
//                       />
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center mt-4">
//                     <Link
//                       to={`/program/${program._id}`}
//                       className="text-blue-500 text-sm hover:underline"
//                     >
//                       View Details
//                     </Link>

//                     {!progress ? (
//                       <button
//                         onClick={() => handleEnroll(program._id)}
//                         className="bg-[#00A8FF] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600 transition"
//                       >
//                         Enroll
//                       </button>
//                     ) : (
//                       <span className="text-green-600 text-sm font-medium">Enrolled ✅</span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProgramPage;


"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Calendar, Dumbbell, TrendingUp, Flame, StretchVerticalIcon as Stretch, Search, ChevronRight, Clock, User, CheckCircle, X, Filter, CalendarDays, BarChart2 } from 'lucide-react'

const ProgramPage = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [goalFilter, setGoalFilter] = useState("all")
  const [userProgress, setUserProgress] = useState({})
  const [startDateMap, setStartDateMap] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [enrollingProgram, setEnrollingProgram] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const programRes = await fetch("http://localhost:8000/api/programs")
        const programData = await programRes.json()

        if (programData.success) {
          setPrograms(programData.programs)

          // Initialize start dates with today's date
          const dateMap = {}
          programData.programs.forEach((p) => {
            dateMap[p._id] = new Date().toISOString().slice(0, 10)
          })
          setStartDateMap(dateMap)

          // Fetch progress for each program
          const progressResults = await Promise.all(
            programData.programs.map((p) =>
              fetch(`http://localhost:8000/api/programs/${p._id}/progress`, {
                credentials: "include",
              })
                .then((res) => res.json())
                .catch(() => ({ success: false }))
            )
          )

          const progressMap = {}
          progressResults.forEach((result, index) => {
            if (result.success) {
              const programId = programData.programs[index]._id
              progressMap[programId] = result.progress
            }
          })

          setUserProgress(progressMap)
        } else {
          toast.error("Failed to fetch programs")
        }
      } catch (err) {
        console.error("Error fetching programs:", err)
        toast.error("Error fetching programs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEnroll = async (programId) => {
    try {
      setEnrollingProgram(programId)
      const startDate = startDateMap[programId] || new Date().toISOString().slice(0, 10)

      const res = await fetch(`http://localhost:8000/api/programs/${programId}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ startDate }),
      })
      const data = await res.json()
      
      if (data.success) {
        toast.success("Enrolled successfully!")
        setUserProgress((prev) => ({ ...prev, [programId]: data.progress }))
      } else {
        toast.error(data.message || "Enrollment failed")
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      toast.error("Enrollment failed. Please try again.")
    } finally {
      setEnrollingProgram(null)
    }
  }

  // Filter programs by goal and search term
  const filteredPrograms = programs
    .filter((p) => goalFilter === "all" || p.goal.toLowerCase() === goalFilter.toLowerCase())
    .filter((p) => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.goal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.trainer?.name && p.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  // Get goal icon
  const getGoalIcon = (goal) => {
    switch (goal.toLowerCase()) {
      case "strength":
        return <Dumbbell className="w-4 h-4" />
      case "weightloss":
        return <Flame className="w-4 h-4" />
      case "cardio":
        return <TrendingUp className="w-4 h-4" />
      case "flexibility":
        return <Stretch className="w-4 h-4" />
      default:
        return <BarChart2 className="w-4 h-4" />
    }
  }

  // Calculate progress percentage
  const calculateProgress = (programId) => {
    const progress = userProgress[programId]
    if (!progress) return 0
    
    const program = programs.find(p => p._id === programId)
    if (!program) return 0
    
    const completedDays = progress.completed?.length || 0
    const totalItems = program.days.length * 4 // 4 items per day (workout, meal, snack, meditation)
    
    return Math.round((completedDays / totalItems) * 100)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Fitness Programs</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Discover personalized fitness programs designed to help you achieve your goals with structured workouts,
              nutrition plans, and mindfulness practices.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[#0E0E2C] font-medium px-4 py-2 border border-gray-300 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {["all", "strength", "weightloss", "cardio", "flexibility"].map((g) => (
              <button
                key={g}
                onClick={() => setGoalFilter(g)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  goalFilter === g
                    ? "bg-[#00A8FF] text-white"
                    : "bg-gray-100 text-[#0E0E2C] hover:bg-gray-200"
                }`}
              >
                {g !== "all" && getGoalIcon(g)}
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
            <p className="mt-4 text-gray-500">Loading programs...</p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No programs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? `No programs match "${searchTerm}"`
                : `No ${goalFilter !== "all" ? goalFilter : ""} programs available`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setGoalFilter("all")
              }}
              className="text-[#00A8FF] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => {
              const progress = userProgress[program._id]
              const progressPercentage = calculateProgress(program._id)
              const isEnrolled = !!progress
              const isEnrolling = enrollingProgram === program._id

              return (
                <div
                  key={program._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Program Header */}
                  <div className="bg-gradient-to-r from-[#0E0E2C]/90 to-[#00A8FF]/90 p-4 relative">
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-pattern opacity-10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                          {getGoalIcon(program.goal)}
                          <span className="capitalize">{program.goal}</span>
                        </span>
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {program.days.length} Days
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{program.name}</h3>
                    </div>
                  </div>

                  {/* Program Content */}
                  <div className="p-5">
                    {/* Trainer Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={program.trainer?.profilePicture || "/placeholder.svg?height=40&width=40"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        alt={program.trainer?.name || "Trainer"}
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=40&width=40"
                        }}
                      />
                      <div>
                        <p className="font-medium text-[#0E0E2C]">{program.trainer?.name || "Trainer"}</p>
                        <p className="text-xs text-gray-500">{program.trainer?.specialization || "Fitness Coach"}</p>
                      </div>
                    </div>

                    {/* Program Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {program.description || `A comprehensive ${program.goal} program designed to help you achieve your fitness goals.`}
                    </p>

                    {/* Progress or Start Date */}
                    {isEnrolled ? (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-[#0E0E2C]">Your Progress</span>
                          <span className="text-sm text-[#00A8FF] font-medium">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#00A8FF] h-2 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-[#0E0E2C] mb-1">Start Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF] pl-10"
                            value={startDateMap[program._id] || ""}
                            onChange={(e) =>
                              setStartDateMap((prev) => ({
                                ...prev,
                                [program._id]: e.target.value,
                              }))
                            }
                            min={new Date().toISOString().split("T")[0]}
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/program/${program._id}`}
                        className="text-[#00A8FF] font-medium text-sm hover:underline flex items-center gap-1"
                      >
                        View Details <ChevronRight className="w-4 h-4" />
                      </Link>

                      {isEnrolled ? (
                        <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Enrolled
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEnroll(program._id)}
                          disabled={isEnrolling}
                          className={`bg-[#00A8FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0096E6] transition-colors flex items-center gap-1 ${
                            isEnrolling ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                        >
                          {isEnrolling ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Enrolling...
                            </>
                          ) : (
                            <>Enroll Now</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgramPage
  