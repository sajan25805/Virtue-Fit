// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { useParams, useNavigate, Link } from "react-router-dom"
// // // // import { ArrowLeft, Clock, Flame, BarChart, Calendar, CheckCircle, Mail, Award } from "lucide-react"

// // // // const WorkoutDetailPage = () => {
// // // //   const { id } = useParams()
// // // //   const navigate = useNavigate()
// // // //   const [workout, setWorkout] = useState(null)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)

// // // //   useEffect(() => {
// // // //     const fetchWorkoutDetails = async () => {
// // // //       try {
// // // //         setLoading(true)
// // // //         const response = await fetch(`http://localhost:8000/api/workouts/${id}`)

// // // //         if (!response.ok) {
// // // //           throw new Error(`Failed to fetch workout details: ${response.status}`)
// // // //         }

// // // //         const data = await response.json()
// // // //         setWorkout(data)
// // // //       } catch (err) {
// // // //         console.error("Error fetching workout details:", err)
// // // //         setError("Failed to load workout details. Please try again later.")
// // // //       } finally {
// // // //         setLoading(false)
// // // //       }
// // // //     }

// // // //     if (id) {
// // // //       fetchWorkoutDetails()
// // // //     }
// // // //   }, [id])

// // // //   // Function to format date
// // // //   const formatDate = (dateString) => {
// // // //     const date = new Date(dateString)
// // // //     return date.toLocaleDateString("en-US", {
// // // //       year: "numeric",
// // // //       month: "long",
// // // //       day: "numeric",
// // // //     })
// // // //   }

// // // //   // Function to get difficulty badge color
// // // //   const getDifficultyColor = (difficulty) => {
// // // //     if (!difficulty) return "bg-blue-500"

// // // //     switch (difficulty.toLowerCase()) {
// // // //       case "easy":
// // // //         return "bg-green-500"
// // // //       case "medium":
// // // //         return "bg-yellow-500"
// // // //       case "hard":
// // // //         return "bg-red-500"
// // // //       default:
// // // //         return "bg-blue-500"
// // // //     }
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen bg-[#F7F7FD]">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (error || !workout) {
// // // //     return (
// // // //       <div className="container mx-auto px-4 py-8 bg-[#F7F7FD] min-h-screen">
// // // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
// // // //           <span className="block sm:inline">{error || "Workout not found"}</span>
// // // //         </div>
// // // //         <button onClick={() => navigate(-1)} className="flex items-center text-[#0E0E2C] hover:underline">
// // // //           <ArrowLeft className="h-4 w-4 mr-1" />
// // // //           Back to workouts
// // // //         </button>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="bg-[#F7F7FD] min-h-screen">
// // // //       <div className="container mx-auto px-4 py-8">
// // // //         {/* Back button */}
// // // //         <Link to="/workout" className="flex items-center text-[#0E0E2C] hover:underline mb-6">
// // // //           <ArrowLeft className="h-4 w-4 mr-1" />
// // // //           Back to workouts
// // // //         </Link>

// // // //         {/* Workout header */}
// // // //         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
// // // //           <div className="relative h-64 md:h-96">
// // // //             <img
// // // //               src={workout.thumbnail || "/placeholder.svg"}
// // // //               alt={workout.title}
// // // //               className="w-full h-full object-cover"
// // // //             />
// // // //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
// // // //               <div className="flex flex-wrap gap-2 mb-2">
// // // //                 <span
// // // //                   className={`${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold px-2 py-1 rounded-full`}
// // // //                 >
// // // //                   {workout.difficulty}
// // // //                 </span>
// // // //                 <span className="bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">{workout.aim}</span>
// // // //               </div>
// // // //               <h1 className="text-3xl md:text-4xl font-bold text-white">{workout.title}</h1>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //           {/* Main content */}
// // // //           <div className="lg:col-span-2">
// // // //             {/* Video section */}
// // // //             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
// // // //               <div className="aspect-video">
// // // //                 <video
// // // //                   src={workout.videoUrl}
// // // //                   controls
// // // //                   poster={workout.thumbnail}
// // // //                   className="w-full h-full object-cover"
// // // //                 >
// // // //                   Your browser does not support the video tag.
// // // //                 </video>
// // // //               </div>
// // // //             </div>

// // // //             {/* Workout details */}
// // // //             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// // // //               <h2 className="text-2xl font-bold text-[#0E0E2C] mb-4">Workout Details</h2>
// // // //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // // //                   <Clock className="h-6 w-6 text-[#00A8FF] mb-2" />
// // // //                   <span className="text-sm text-gray-500">Duration</span>
// // // //                   <span className="font-semibold">{workout.duration} min</span>
// // // //                 </div>
// // // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // // //                   <Flame className="h-6 w-6 text-[#00A8FF] mb-2" />
// // // //                   <span className="text-sm text-gray-500">Calories</span>
// // // //                   <span className="font-semibold">{workout.calorie} kcal</span>
// // // //                 </div>
// // // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // // //                   <BarChart className="h-6 w-6 text-[#00A8FF] mb-2" />
// // // //                   <span className="text-sm text-gray-500">Time</span>
// // // //                   <span className="font-semibold">{workout.time} hr</span>
// // // //                 </div>
// // // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // // //                   <Calendar className="h-6 w-6 text-[#00A8FF] mb-2" />
// // // //                   <span className="text-sm text-gray-500">Created</span>
// // // //                   <span className="font-semibold text-xs">{formatDate(workout.createdAt)}</span>
// // // //                 </div>
// // // //               </div>

// // // //               <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">Description</h3>
// // // //               <p className="text-gray-700 mb-6">{workout.description}</p>

// // // //               <div className="flex justify-center">
// // // //                 <button className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-3 px-8 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium flex items-center">
// // // //                   <CheckCircle className="h-5 w-5 mr-2" />
// // // //                   {workout.isCompleted ? "Completed" : "Mark as Completed"}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Sidebar */}
// // // //           <div className="lg:col-span-1">
// // // //             {/* Trainer info */}
// // // //             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// // // //               <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Trainer</h2>
// // // //               <div className="flex flex-col items-center">
// // // //                 <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
// // // //                   <img
// // // //                     src={workout.trainer.profilePicture || "/placeholder.svg"}
// // // //                     alt={workout.trainer.name}
// // // //                     className="w-full h-full object-cover"
// // // //                   />
// // // //                 </div>
// // // //                 <h3 className="text-lg font-semibold text-[#0E0E2C]">{workout.trainer.name}</h3>
// // // //                 <span className="bg-[#F7F7FD] text-[#00A8FF] text-xs font-bold px-2 py-1 rounded-full mb-4">
// // // //                   {workout.trainer.specialization}
// // // //                 </span>

// // // //                 <div className="w-full space-y-3">
// // // //                   <div className="flex items-center text-gray-700">
// // // //                     <Mail className="h-4 w-4 mr-2 text-[#00A8FF]" />
// // // //                     <span className="text-sm">{workout.trainer.email}</span>
// // // //                   </div>
// // // //                   <div className="flex items-center text-gray-700">
// // // //                     <Award className="h-4 w-4 mr-2 text-[#00A8FF]" />
// // // //                     <span className="text-sm">Certified {workout.trainer.specialization} Trainer</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Related workouts placeholder */}
// // // //             <div className="bg-white rounded-lg shadow-md p-6">
// // // //               <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Similar Workouts</h2>
// // // //               <p className="text-gray-500 text-sm">More {workout.aim} workouts coming soon!</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default WorkoutDetailPage




// // // "use client"

// // // import { useState, useEffect, useRef } from "react"
// // // import { useParams, useNavigate, Link } from "react-router-dom"
// // // import { ArrowLeft, Clock, Flame, BarChart, Calendar, CheckCircle, Mail, Award } from "lucide-react"

// // // const WorkoutDetailPage = () => {
// // //   const { id } = useParams()
// // //   const navigate = useNavigate()
// // //   const [workout, setWorkout] = useState(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [error, setError] = useState(null)
// // //   const [isCompleted, setIsCompleted] = useState(false)
// // //   const [progress, setProgress] = useState(0)
// // //   const videoRef = useRef(null)
// // //   const trackerRef = useRef(null)

// // //   useEffect(() => {
// // //     const fetchWorkoutDetails = async () => {
// // //       try {
// // //         setLoading(true)
// // //         const response = await fetch(`http://localhost:8000/api/workouts/${id}`)

// // //         if (!response.ok) {
// // //           throw new Error(`Failed to fetch workout details: ${response.status}`)
// // //         }

// // //         const data = await response.json()
// // //         setWorkout(data)
// // //         setIsCompleted(data.isCompleted || false)
// // //       } catch (err) {
// // //         console.error("Error fetching workout details:", err)
// // //         setError("Failed to load workout details. Please try again later.")
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }

// // //     if (id) {
// // //       fetchWorkoutDetails()
// // //     }
// // //   }, [id])

// // //   useEffect(() => {
// // //     if (!workout?.videoUrl) return

// // //     const handleVideoComplete = async () => {
// // //       setIsCompleted(true)
// // //       // Update completion status in backend
// // //       try {
// // //         await fetch(`http://localhost:8000/api/workouts/${id}/complete`, {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //         });
// // //       } catch (err) {
// // //         console.error("Error marking workout as complete:", err)
// // //       }
// // //     }

// // //     const handleProgress = (currentProgress) => {
// // //       setProgress(currentProgress)
// // //       // Optional: Auto-complete if watched more than 90%
// // //       if (currentProgress >= 90 && !isCompleted) {
// // //         handleVideoComplete()
// // //       }
// // //     }

// // //     // Initialize video tracker
// // //     trackerRef.current = createVideoTracker(
// // //       workout.videoUrl,
// // //       handleVideoComplete,
// // //       handleProgress
// // //     )

// // //     // Set video element reference
// // //     if (videoRef.current) {
// // //       videoRef.current.src = workout.videoUrl
// // //       videoRef.current.addEventListener('ended', handleVideoComplete)
// // //       videoRef.current.addEventListener('timeupdate', () => {
// // //         if (videoRef.current.duration) {
// // //           const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
// // //           handleProgress(currentProgress)
// // //         }
// // //       })
// // //     }

// // //     return () => {
// // //       if (trackerRef.current) {
// // //         trackerRef.current.destroy()
// // //       }
// // //       if (videoRef.current) {
// // //         videoRef.current.removeEventListener('ended', handleVideoComplete)
// // //         videoRef.current.removeEventListener('timeupdate', handleProgress)
// // //       }
// // //     }
// // //   }, [workout?.videoUrl, id, isCompleted])

// // //   const handleMarkComplete = async () => {
// // //     if (!isCompleted) {
// // //       setIsCompleted(true)
// // //       try {
// // //         await fetch(`http://localhost:8000/api/workouts/${id}/complete`, {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //         });
// // //       } catch (err) {
// // //         console.error("Error marking workout as complete:", err)
// // //         setIsCompleted(false)
// // //       }
// // //     }
// // //   }

// // //   // Function to format date
// // //   const formatDate = (dateString) => {
// // //     const date = new Date(dateString)
// // //     return date.toLocaleDateString("en-US", {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //     })
// // //   }

// // //   // Function to get difficulty badge color
// // //   const getDifficultyColor = (difficulty) => {
// // //     if (!difficulty) return "bg-blue-500"

// // //     switch (difficulty.toLowerCase()) {
// // //       case "easy":
// // //         return "bg-green-500"
// // //       case "medium":
// // //         return "bg-yellow-500"
// // //       case "hard":
// // //         return "bg-red-500"
// // //       default:
// // //         return "bg-blue-500"
// // //     }
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen bg-[#F7F7FD]">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
// // //       </div>
// // //     )
// // //   }

// // //   if (error || !workout) {
// // //     return (
// // //       <div className="container mx-auto px-4 py-8 bg-[#F7F7FD] min-h-screen">
// // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
// // //           <span className="block sm:inline">{error || "Workout not found"}</span>
// // //         </div>
// // //         <button onClick={() => navigate(-1)} className="flex items-center text-[#0E0E2C] hover:underline">
// // //           <ArrowLeft className="h-4 w-4 mr-1" />
// // //           Back to workouts
// // //         </button>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="bg-[#F7F7FD] min-h-screen">
// // //       <div className="container mx-auto px-4 py-8">
// // //         {/* Back button */}
// // //         <Link to="/workout" className="flex items-center text-[#0E0E2C] hover:underline mb-6">
// // //           <ArrowLeft className="h-4 w-4 mr-1" />
// // //           Back to workouts
// // //         </Link>

// // //         {/* Workout header */}
// // //         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
// // //           <div className="relative h-64 md:h-96">
// // //             <img
// // //               src={workout.thumbnail || "/placeholder.svg"}
// // //               alt={workout.title}
// // //               className="w-full h-full object-cover"
// // //             />
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
// // //               <div className="flex flex-wrap gap-2 mb-2">
// // //                 <span
// // //                   className={`${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold px-2 py-1 rounded-full`}
// // //                 >
// // //                   {workout.difficulty}
// // //                 </span>
// // //                 <span className="bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">{workout.aim}</span>
// // //               </div>
// // //               <h1 className="text-3xl md:text-4xl font-bold text-white">{workout.title}</h1>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //           {/* Main content */}
// // //           <div className="lg:col-span-2">
// // //             {/* Video section */}
// // //             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
// // //               <div className="aspect-video relative">
// // //                 <video
// // //                   ref={videoRef}
// // //                   controls
// // //                   poster={workout.thumbnail}
// // //                   className="w-full h-full object-cover"
// // //                 >
// // //                   <source src={workout.videoUrl} type="video/mp4" />
// // //                   Your browser does not support the video tag.
// // //                 </video>
// // //                 {/* Progress bar */}
// // //                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
// // //                   <div 
// // //                     className="h-full bg-[#00A8FF] transition-all duration-300" 
// // //                     style={{ width: `${progress}%` }}
// // //                   />
// // //                 </div>
// // //                 {progress > 0 && progress < 100 && (
// // //                   <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
// // //                     {Math.round(progress)}% watched
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Workout details */}
// // //             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// // //               <h2 className="text-2xl font-bold text-[#0E0E2C] mb-4">Workout Details</h2>
// // //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // //                   <Clock className="h-6 w-6 text-[#00A8FF] mb-2" />
// // //                   <span className="text-sm text-gray-500">Duration</span>
// // //                   <span className="font-semibold">{workout.duration} min</span>
// // //                 </div>
// // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // //                   <Flame className="h-6 w-6 text-[#00A8FF] mb-2" />
// // //                   <span className="text-sm text-gray-500">Calories</span>
// // //                   <span className="font-semibold">{workout.calorie} kcal</span>
// // //                 </div>
// // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // //                   <BarChart className="h-6 w-6 text-[#00A8FF] mb-2" />
// // //                   <span className="text-sm text-gray-500">Time</span>
// // //                   <span className="font-semibold">{workout.time} hr</span>
// // //                 </div>
// // //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// // //                   <Calendar className="h-6 w-6 text-[#00A8FF] mb-2" />
// // //                   <span className="text-sm text-gray-500">Created</span>
// // //                   <span className="font-semibold text-xs">{formatDate(workout.createdAt)}</span>
// // //                 </div>
// // //               </div>

// // //               <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">Description</h3>
// // //               <p className="text-gray-700 mb-6">{workout.description}</p>

// // //               <div className="flex justify-center">
// // //                 <button 
// // //                   onClick={handleMarkComplete}
// // //                   className={`bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-3 px-8 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium flex items-center ${
// // //                     isCompleted ? 'opacity-75 cursor-not-allowed' : ''
// // //                   }`}
// // //                   disabled={isCompleted}
// // //                 >
// // //                   <CheckCircle className="h-5 w-5 mr-2" />
// // //                   {isCompleted ? "Completed" : "Mark as Completed"}
// // //                 </button>
// // //               </div>
// // //               {isCompleted && (
// // //                 <div className="mt-4 text-center text-green-600 flex items-center justify-center">
// // //                   <CheckCircle className="h-5 w-5 mr-2" />
// // //                   <span>You've completed this workout!</span>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Sidebar */}
// // //           <div className="lg:col-span-1">
// // //             {/* Trainer info */}
// // //             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// // //               <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Trainer</h2>
// // //               <div className="flex flex-col items-center">
// // //                 <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
// // //                   <img
// // //                     src={workout.trainer.profilePicture || "/placeholder.svg"}
// // //                     alt={workout.trainer.name}
// // //                     className="w-full h-full object-cover"
// // //                   />
// // //                 </div>
// // //                 <h3 className="text-lg font-semibold text-[#0E0E2C]">{workout.trainer.name}</h3>
// // //                 <span className="bg-[#F7F7FD] text-[#00A8FF] text-xs font-bold px-2 py-1 rounded-full mb-4">
// // //                   {workout.trainer.specialization}
// // //                 </span>

// // //                 <div className="w-full space-y-3">
// // //                   <div className="flex items-center text-gray-700">
// // //                     <Mail className="h-4 w-4 mr-2 text-[#00A8FF]" />
// // //                     <span className="text-sm">{workout.trainer.email}</span>
// // //                   </div>
// // //                   <div className="flex items-center text-gray-700">
// // //                     <Award className="h-4 w-4 mr-2 text-[#00A8FF]" />
// // //                     <span className="text-sm">Certified {workout.trainer.specialization} Trainer</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Related workouts placeholder */}
// // //             <div className="bg-white rounded-lg shadow-md p-6">
// // //               <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Similar Workouts</h2>
// // //               <p className="text-gray-500 text-sm">More {workout.aim} workouts coming soon!</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // // Video tracker utility function
// // // const createVideoTracker = (videoUrl, onComplete, onProgress) => {
// // //   const videoElement = document.createElement('video')
// // //   videoElement.src = videoUrl

// // //   let isCompleted = false
// // //   let currentProgress = 0

// // //   const handleVideoEnd = () => {
// // //     if (!isCompleted) {
// // //       isCompleted = true
// // //       onComplete()
// // //     }
// // //   }

// // //   const handleTimeUpdate = () => {
// // //     if (videoElement.duration) {
// // //       currentProgress = (videoElement.currentTime / videoElement.duration) * 100
// // //       if (onProgress) {
// // //         onProgress(currentProgress)
// // //       }
// // //     }
// // //   }

// // //   videoElement.addEventListener('ended', handleVideoEnd)
// // //   videoElement.addEventListener('timeupdate', handleTimeUpdate)

// // //   return {
// // //     getVideoElement: () => videoElement,
// // //     play: () => videoElement.play(),
// // //     pause: () => videoElement.pause(),
// // //     isCompleted: () => isCompleted,
// // //     getProgress: () => currentProgress,
// // //     markAsComplete: () => {
// // //       if (!isCompleted) {
// // //         isCompleted = true
// // //         onComplete()
// // //       }
// // //     },
// // //     destroy: () => {
// // //       videoElement.removeEventListener('ended', handleVideoEnd)
// // //       videoElement.removeEventListener('timeupdate', handleTimeUpdate)
// // //     }
// // //   }
// // // }

// // // export default WorkoutDetailPage;



// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { useParams, useNavigate, Link } from "react-router-dom"
// // import { ArrowLeft, Clock, Flame, BarChart, Calendar, CheckCircle, Mail, Award } from "lucide-react"

// // const WorkoutDetailPage = () => {
// //   const { id } = useParams()
// //   const navigate = useNavigate()
// //   const [workout, setWorkout] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)
// //   const [isCompleted, setIsCompleted] = useState(false)
// //   const [progress, setProgress] = useState(0)
// //   const [showCompleteButton, setShowCompleteButton] = useState(false)
// //   const videoRef = useRef(null)
// //   const lastAllowedTimeRef = useRef(0)

// //   useEffect(() => {
// //     const fetchWorkoutDetails = async () => {
// //       try {
// //         setLoading(true)
// //         const response = await fetch(`http://localhost:8000/api/workouts/${id}`)

// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch workout details: ${response.status}`)
// //         }

// //         const data = await response.json()
// //         setWorkout(data)
// //         setIsCompleted(data.isCompleted || false)
// //       } catch (err) {
// //         console.error("Error fetching workout details:", err)
// //         setError("Failed to load workout details. Please try again later.")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     if (id) {
// //       fetchWorkoutDetails()
// //     }
// //   }, [id])

// //   useEffect(() => {
// //     if (!workout?.videoUrl) return

// //     const handleVideoComplete = async () => {
// //       setIsCompleted(true)
// //       setShowCompleteButton(true)
// //       try {
// //         await fetch(`http://localhost:8000/api/workouts/${id}/complete`, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         })
// //       } catch (err) {
// //         console.error("Error marking workout as complete:", err)
// //       }
// //     }

// //     const handleTimeUpdate = () => {
// //       if (videoRef.current && videoRef.current.duration) {
// //         const currentTime = videoRef.current.currentTime
// //         const duration = videoRef.current.duration
// //         const newProgress = (currentTime / duration) * 100

// //         // Update last allowed time if progressing normally
// //         if (currentTime >= lastAllowedTimeRef.current) {
// //           lastAllowedTimeRef.current = currentTime
// //           setProgress(newProgress)
// //         } else {
// //           // If user tries to rewind, allow it but don't update progress
// //           videoRef.current.currentTime = Math.min(currentTime, lastAllowedTimeRef.current)
// //         }

// //         // Show complete button after 90%
// //         setShowCompleteButton(newProgress >= 90 || isCompleted)
// //       }
// //     }

// //     const handleSeeking = () => {
// //       if (videoRef.current) {
// //         const currentTime = videoRef.current.currentTime
// //         if (currentTime > lastAllowedTimeRef.current) {
// //           videoRef.current.currentTime = lastAllowedTimeRef.current
// //         }
// //       }
// //     }

// //     const handleKeyDown = (e) => {
// //       // Disable keyboard shortcuts for video control
// //       if (['ArrowRight', 'ArrowUp', ' '].includes(e.key)) {
// //         e.preventDefault()
// //       }
// //     }

// //     if (videoRef.current) {
// //       videoRef.current.src = workout.videoUrl
// //       videoRef.current.addEventListener('timeupdate', handleTimeUpdate)
// //       videoRef.current.addEventListener('seeking', handleSeeking)
// //       videoRef.current.addEventListener('ended', handleVideoComplete)
// //       window.addEventListener('keydown', handleKeyDown)
// //     }

// //     return () => {
// //       if (videoRef.current) {
// //         videoRef.current.removeEventListener('timeupdate', handleTimeUpdate)
// //         videoRef.current.removeEventListener('seeking', handleSeeking)
// //         videoRef.current.removeEventListener('ended', handleVideoComplete)
// //       }
// //       window.removeEventListener('keydown', handleKeyDown)
// //     }
// //   }, [workout?.videoUrl, id, isCompleted])

// //   const handleMarkComplete = async () => {
// //     if (!isCompleted) {
// //       setIsCompleted(true)
// //       try {
// //         await fetch(`http://localhost:8000/api/workouts/${id}/complete`, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         })
// //       } catch (err) {
// //         console.error("Error marking workout as complete:", err)
// //         setIsCompleted(false)
// //       }
// //     }
// //   }

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString)
// //     return date.toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "long",
// //       day: "numeric",
// //     })
// //   }

// //   const getDifficultyColor = (difficulty) => {
// //     if (!difficulty) return "bg-blue-500"

// //     switch (difficulty.toLowerCase()) {
// //       case "easy":
// //         return "bg-green-500"
// //       case "medium":
// //         return "bg-yellow-500"
// //       case "hard":
// //         return "bg-red-500"
// //       default:
// //         return "bg-blue-500"
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen bg-[#F7F7FD]">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
// //       </div>
// //     )
// //   }

// //   if (error || !workout) {
// //     return (
// //       <div className="container mx-auto px-4 py-8 bg-[#F7F7FD] min-h-screen">
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
// //           <span className="block sm:inline">{error || "Workout not found"}</span>
// //         </div>
// //         <button onClick={() => navigate(-1)} className="flex items-center text-[#0E0E2C] hover:underline">
// //           <ArrowLeft className="h-4 w-4 mr-1" />
// //           Back to workouts
// //         </button>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="bg-[#F7F7FD] min-h-screen">
// //       <div className="container mx-auto px-4 py-8">
// //         <Link to="/workout" className="flex items-center text-[#0E0E2C] hover:underline mb-6">
// //           <ArrowLeft className="h-4 w-4 mr-1" />
// //           Back to workouts
// //         </Link>

// //         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
// //           <div className="relative h-64 md:h-96">
// //             <img
// //               src={workout.thumbnail || "/placeholder.svg"}
// //               alt={workout.title}
// //               className="w-full h-full object-cover"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
// //               <div className="flex flex-wrap gap-2 mb-2">
// //                 <span
// //                   className={`${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold px-2 py-1 rounded-full`}
// //                 >
// //                   {workout.difficulty}
// //                 </span>
// //                 <span className="bg-[#00A8FF] text-white text-xs font-bold px-2 py-1 rounded-full">{workout.aim}</span>
// //               </div>
// //               <h1 className="text-3xl md:text-4xl font-bold text-white">{workout.title}</h1>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2">
// //             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
// //               <div className="aspect-video relative">
// //                 <video
// //                   ref={videoRef}
// //                   controls
// //                   controlsList="nodownload noplaybackrate nofullscreen"
// //                   poster={workout.thumbnail}
// //                   className="w-full h-full object-cover"
// //                   onContextMenu={(e) => e.preventDefault()}
// //                 >
// //                   <source src={workout.videoUrl} type="video/mp4" />
// //                   Your browser does not support the video tag.
// //                 </video>
// //                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
// //                   <div 
// //                     className="h-full bg-[#00A8FF] transition-all duration-300" 
// //                     style={{ width: `${progress}%` }}
// //                   />
// //                 </div>
// //                 {progress > 0 && progress < 100 && (
// //                   <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
// //                     {Math.round(progress)}% watched
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// //               <h2 className="text-2xl font-bold text-[#0E0E2C] mb-4">Workout Details</h2>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// //                   <Clock className="h-6 w-6 text-[#00A8FF] mb-2" />
// //                   <span className="text-sm text-gray-500">Duration</span>
// //                   <span className="font-semibold">{workout.duration} min</span>
// //                 </div>
// //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// //                   <Flame className="h-6 w-6 text-[#00A8FF] mb-2" />
// //                   <span className="text-sm text-gray-500">Calories</span>
// //                   <span className="font-semibold">{workout.calorie} kcal</span>
// //                 </div>
// //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// //                   <BarChart className="h-6 w-6 text-[#00A8FF] mb-2" />
// //                   <span className="text-sm text-gray-500">Time</span>
// //                   <span className="font-semibold">{workout.time} hr</span>
// //                 </div>
// //                 <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
// //                   <Calendar className="h-6 w-6 text-[#00A8FF] mb-2" />
// //                   <span className="text-sm text-gray-500">Created</span>
// //                   <span className="font-semibold text-xs">{formatDate(workout.createdAt)}</span>
// //                 </div>
// //               </div>

// //               <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">Description</h3>
// //               <p className="text-gray-700 mb-6">{workout.description}</p>

// //               <div className="flex justify-center">
// //                 {(showCompleteButton || isCompleted) && (
// //                   <button 
// //                     onClick={handleMarkComplete}
// //                     className={`bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-3 px-8 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium flex items-center ${
// //                       isCompleted ? 'opacity-75 cursor-not-allowed' : ''
// //                     }`}
// //                     disabled={isCompleted}
// //                   >
// //                     <CheckCircle className="h-5 w-5 mr-2" />
// //                     {isCompleted ? "Completed" : "Mark as Completed"}
// //                   </button>
// //                 )}
// //               </div>
// //               {isCompleted && (
// //                 <div className="mt-4 text-center text-green-600 flex items-center justify-center">
// //                   <CheckCircle className="h-5 w-5 mr-2" />
// //                   <span>You've completed this workout!</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// //               <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Trainer</h2>
// //               <div className="flex flex-col items-center">
// //                 <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
// //                   <img
// //                     src={workout.trainer.profilePicture || "/placeholder.svg"}
// //                     alt={workout.trainer.name}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>
// //                 <h3 className="text-lg font-semibold text-[#0E0E2C]">{workout.trainer.name}</h3>
// //                 <span className="bg-[#F7F7FD] text-[#00A8FF] text-xs font-bold px-2 py-1 rounded-full mb-4">
// //                   {workout.trainer.specialization}
// //                 </span>

// //                 <div className="w-full space-y-3">
// //                   <div className="flex items-center text-gray-700">
// //                     <Mail className="h-4 w-4 mr-2 text-[#00A8FF]" />
// //                     <span className="text-sm">{workout.trainer.email}</span>
// //                   </div>
// //                   <div className="flex items-center text-gray-700">
// //                     <Award className="h-4 w-4 mr-2 text-[#00A8FF]" />
// //                     <span className="text-sm">Certified {workout.trainer.specialization} Trainer</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Similar Workouts</h2>
// //               <p className="text-gray-500 text-sm">More {workout.aim} workouts coming soon!</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default WorkoutDetailPage;



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, Clock, Flame, BarChart, Calendar, CheckCircle, Mail, Award } from "lucide-react";

// const WorkoutDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [workout, setWorkout] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [progressId, setProgressId] = useState(null); // Track progress ID
//   const videoRef = useRef(null);
//   const lastAllowedTimeRef = useRef(0);

//   useEffect(() => {
//     const fetchWorkoutDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:8000/api/workouts/${id}`);

//         if (!response.ok) {
//           throw new Error(`Failed to fetch workout details: ${response.status}`);
//         }

//         const data = await response.json();
//         setWorkout(data);
//         setIsCompleted(data.isCompleted || false);
//       } catch (err) {
//         console.error("Error fetching workout details:", err);
//         setError("Failed to load workout details. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchWorkoutDetails();
//     }
//   }, [id]);

//   // Start workout progress
//   const startWorkoutProgress = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/workout-progress/start", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ workoutId: id })
//       });
//       const data = await res.json();
//       console.log("Workout Progress Started:", data);
//       return data.progress._id;
//     } catch (err) {
//       console.error("Error starting workout progress:", err);
//       return null;
//     }
//   };

//   // Mark workout complete
//   const handleMarkComplete = async () => {
//     if (!isCompleted && progressId) {
//       setIsCompleted(true);
//       try {
//         await fetch(`http://localhost:8000/api/workout-progress/complete/${progressId}`, {
//           method: 'PATCH',
//           credentials: 'include',
//         });
//       } catch (err) {
//         console.error("Error marking workout as complete:", err);
//         setIsCompleted(false);
//       }
//     }
//   };

//   const handlePlay = async () => {
//     if (!progressId) {
//       const newProgressId = await startWorkoutProgress();
//       setProgressId(newProgressId);
//     }
//   };

//   useEffect(() => {
//     if (!workout?.videoUrl) return;

//     const handleTimeUpdate = () => {
//       if (videoRef.current && videoRef.current.duration) {
//         const currentTime = videoRef.current.currentTime;
//         const duration = videoRef.current.duration;
//         const newProgress = (currentTime / duration) * 100;

//         if (currentTime >= lastAllowedTimeRef.current) {
//           lastAllowedTimeRef.current = currentTime;
//           setProgress(newProgress);
//         } else {
//           videoRef.current.currentTime = Math.min(currentTime, lastAllowedTimeRef.current);
//         }

//         if (newProgress >= 90 && !isCompleted) {
//           handleMarkComplete();
//         }
//       }
//     };

//     if (videoRef.current) {
//       videoRef.current.addEventListener('play', handlePlay);
//       videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
//     }

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener('play', handlePlay);
//         videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
//       }
//     };
//   }, [workout?.videoUrl, id, progressId, isCompleted]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
//   };

//   const getDifficultyColor = (difficulty) => {
//     if (!difficulty) return "bg-blue-500";
//     switch (difficulty.toLowerCase()) {
//       case "easy": return "bg-green-500";
//       case "medium": return "bg-yellow-500";
//       case "hard": return "bg-red-500";
//       default: return "bg-blue-500";
//     }
//   };

//   if (loading) return (<div className="flex justify-center items-center h-screen"><div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full"></div></div>);
//   if (error || !workout) return (<div className="text-center p-6">{error || "Workout not found."}</div>);

//   return (
//     <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
//       <div className="container mx-auto">
//         <Link to="/workout" className="text-blue-600 hover:underline mb-6 block"><ArrowLeft /> Back to workouts</Link>

//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h1 className="text-2xl font-bold mb-4">{workout.title}</h1>

//           <video ref={videoRef} controls poster={workout.thumbnail} className="w-full mb-6">
//             <source src={workout.videoUrl} type="video/mp4" />
//           </video>

//           <div className="flex flex-wrap gap-6 mb-6">
//             <div><Clock /> {workout.duration} min</div>
//             <div><Flame /> {workout.calorie} kcal</div>
//             <div><BarChart /> {workout.time} hr</div>
//             <div><Calendar /> {formatDate(workout.createdAt)}</div>
//           </div>

//           <p className="text-gray-700 mb-6">{workout.description}</p>

//           <button
//             onClick={handleMarkComplete}
//             className={`px-6 py-3 rounded text-white ${isCompleted ? "bg-green-500" : "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF]"}`}
//             disabled={isCompleted}
//           >
//             {isCompleted ? "Completed ✅" : "Mark as Completed"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkoutDetailPage;



"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Flame, BarChart, Calendar } from "lucide-react";
import RatingModal from "../../components/RatingModal"; // << import the modal

const WorkoutDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressId, setProgressId] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false); // << New state
  const videoRef = useRef(null);
  const lastAllowedTimeRef = useRef(0);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch workout details: ${response.status}`);
        }

        const data = await response.json();
        setWorkout(data);
        setIsCompleted(data.isCompleted || false);
      } catch (err) {
        console.error("Error fetching workout details:", err);
        setError("Failed to load workout details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkoutDetails();
    }
  }, [id]);

  const startWorkoutProgress = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/workout-progress/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ workoutId: id })
      });
      const data = await res.json();
      return data.progress._id;
    } catch (err) {
      console.error("Error starting workout progress:", err);
      return null;
    }
  };

  const handleMarkComplete = async () => {
    if (!isCompleted && progressId) {
      setIsCompleted(true);
      try {
        await fetch(`http://localhost:8000/api/workout-progress/complete/${progressId}`, {
          method: 'PATCH',
          credentials: 'include',
        });
        setShowRatingModal(true); // << Open Rating Modal After Completing
      } catch (err) {
        console.error("Error marking workout as complete:", err);
        setIsCompleted(false);
      }
    }
  };

  const handlePlay = async () => {
    if (!progressId) {
      const newProgressId = await startWorkoutProgress();
      setProgressId(newProgressId);
    }
  };

  useEffect(() => {
    if (!workout?.videoUrl) return;

    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.duration) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const newProgress = (currentTime / duration) * 100;

        if (currentTime >= lastAllowedTimeRef.current) {
          lastAllowedTimeRef.current = currentTime;
          setProgress(newProgress);
        } else {
          videoRef.current.currentTime = Math.min(currentTime, lastAllowedTimeRef.current);
        }

        if (newProgress >= 90 && !isCompleted) {
          handleMarkComplete();
        }
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', handlePlay);
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', handlePlay);
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [workout?.videoUrl, id, progressId, isCompleted]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-blue-500";
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  if (loading) return (<div className="flex justify-center items-center h-screen"><div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full"></div></div>);
  if (error || !workout) return (<div className="text-center p-6">{error || "Workout not found."}</div>);

  return (
    <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <Link to="/workout" className="text-blue-600 hover:underline mb-6 block"><ArrowLeft /> Back to workouts</Link>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">{workout.title}</h1>

          <video ref={videoRef} controls poster={workout.thumbnail} className="w-full mb-6">
            <source src={workout.videoUrl} type="video/mp4" />
          </video>

          <div className="flex flex-wrap gap-6 mb-6">
            <div><Clock /> {workout.duration} min</div>
            <div><Flame /> {workout.calorie} kcal</div>
            <div><BarChart /> {workout.time} hr</div>
            <div><Calendar /> {formatDate(workout.createdAt)}</div>
          </div>

          <p className="text-gray-700 mb-6">{workout.description}</p>

          <button
            onClick={handleMarkComplete}
            className={`px-6 py-3 rounded text-white ${isCompleted ? "bg-green-500" : "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF]"}`}
            disabled={isCompleted}
          >
            {isCompleted ? "Completed ✅" : "Mark as Completed"}
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal workoutId={id} onClose={() => setShowRatingModal(false)} />
      )}
    </div>
  );
};

export default WorkoutDetailPage;
