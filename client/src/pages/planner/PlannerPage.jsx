
// "use client"

// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import toast from "react-hot-toast"
// import {
//   Dumbbell,
//   Soup,
//   Salad,
//   Brain,
//   CalendarDays,
//   ListTodo,
//   Filter,
//   CheckCircle,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Search,
//   Plus,
//   Calendar,
//   ArrowLeft,
//   Loader2,
//   AlertCircle,
// } from "lucide-react"
// import { DndProvider, useDrag, useDrop } from "react-dnd"
// import { HTML5Backend } from "react-dnd-html5-backend"
// import { motion, AnimatePresence } from "framer-motion"

// // Type definitions for planner items
// const ITEM_TYPES = {
//   workout: {
//     icon: <Dumbbell className="w-5 h-5" />,
//     color: "bg-blue-600",
//     lightColor: "bg-blue-100",
//     textColor: "text-blue-600",
//     borderColor: "border-blue-200",
//     hoverColor: "hover:bg-blue-50",
//   },
//   meal: {
//     icon: <Soup className="w-5 h-5" />,
//     color: "bg-green-600",
//     lightColor: "bg-green-100",
//     textColor: "text-green-600",
//     borderColor: "border-green-200",
//     hoverColor: "hover:bg-green-50",
//   },
//   snack: {
//     icon: <Salad className="w-5 h-5" />,
//     color: "bg-yellow-500",
//     lightColor: "bg-yellow-100",
//     textColor: "text-yellow-600",
//     borderColor: "border-yellow-200",
//     hoverColor: "hover:bg-yellow-50",
//   },
//   meditation: {
//     icon: <Brain className="w-5 h-5" />,
//     color: "bg-purple-600",
//     lightColor: "bg-purple-100",
//     textColor: "text-purple-600",
//     borderColor: "border-purple-200",
//     hoverColor: "hover:bg-purple-50",
//   },
// }

// // Helper function to get the URL for an item
// const getItemUrl = (type, id) => {
//   if (!id) return "#"
//   switch (type) {
//     case "workout":
//       return `/workout/${id}`
//     case "meal":
//       return `/meal/${id}`
//     case "snack":
//       return `/snack/${id}`
//     case "meditation":
//       return `/meditation/${id}`
//     default:
//       return "#"
//   }
// }

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString)
//   return date.toLocaleDateString("en-US", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//   })
// }

// // Helper function to format time
// const formatTime = (dateString) => {
//   const date = new Date(dateString)
//   return date.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   })
// }

// // Helper function to get today's date at midnight
// const getTodayDate = () => {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)
//   return today
// }

// // Helper function to check if a date is today
// const isToday = (dateString) => {
//   const date = new Date(dateString)
//   const today = getTodayDate()
//   return (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   )
// }

// // Helper function to check if a date is in the past
// const isPast = (dateString) => {
//   const date = new Date(dateString)
//   const today = getTodayDate()
//   return date < today
// }

// // Helper function to group items by date
// const groupByDate = (items) => {
//   const grouped = {}
//   items.forEach((item) => {
//     const date = new Date(item.date).toDateString()
//     if (!grouped[date]) {
//       grouped[date] = []
//     }
//     grouped[date].push(item)
//   })
//   return grouped
// }

// // Draggable planner item component
// const PlannerItem = ({ item, onComplete, onReschedule }) => {
//   const navigate = useNavigate()
//   const [{ isDragging }, drag] = useDrag({
//     type: "PLANNER_ITEM",
//     item: { id: item._id, type: item.type, date: item.date },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   })

//   const itemType = ITEM_TYPES[item.type]
//   const isPastItem = isPast(item.date)
//   const isTodayItem = isToday(item.date)

//   // Get program item details
//   const programId = item.program
//   const itemId = item._id

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.2 }}
//       ref={drag}
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//       className={`relative rounded-lg overflow-hidden border shadow-sm transition-all ${
//         item.completed
//           ? "border-green-200 bg-green-50"
//           : isPastItem
//             ? "border-red-200 bg-red-50"
//             : isTodayItem
//               ? "border-blue-200 bg-blue-50"
//               : "border-gray-200 bg-white"
//       } ${isDragging ? "shadow-md" : ""}`}
//     >
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                 item.completed ? "bg-green-500" : itemType.color
//               } text-white`}
//             >
//               {item.completed ? <CheckCircle className="w-4 h-4" /> : itemType.icon}
//             </div>
//             <h3 className="font-medium capitalize">{item.type}</h3>
//           </div>
//           <div
//             className={`text-xs px-2 py-1 rounded-full ${
//               item.completed
//                 ? "bg-green-100 text-green-700"
//                 : isPastItem
//                   ? "bg-red-100 text-red-700"
//                   : isTodayItem
//                     ? "bg-blue-100 text-blue-700"
//                     : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {item.completed ? "Completed" : isPastItem ? "Missed" : isTodayItem ? "Today" : formatDate(item.date)}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 mb-3">
//           <Clock className="w-4 h-4 text-gray-400" />
//           <span className="text-sm text-gray-600">{formatTime(item.date)}</span>
//         </div>

//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => navigate(getItemUrl(item.type, programId))}
//             className="text-[#00A8FF] text-sm font-medium hover:underline"
//           >
//             View Details
//           </button>

//           {!item.completed && (
//             <button
//               onClick={() => onComplete(itemId)}
//               className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-3 py-1 rounded text-sm transition-colors"
//             >
//               Mark Complete
//             </button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// // Calendar day component
// const CalendarDay = ({ date, items, onComplete, onReschedule, onDrop }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: "PLANNER_ITEM",
//     drop: (droppedItem) => onDrop(droppedItem.id, date),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   })

//   const isToday = new Date().toDateString() === date.toDateString()
//   const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

//   return (
//     <div
//       ref={drop}
//       className={`border rounded-lg p-3 min-h-[150px] transition-colors ${
//         isOver ? "bg-blue-50 border-blue-300" : isToday ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
//       } ${isPast ? "opacity-70" : ""}`}
//     >
//       <div className="flex justify-between items-center mb-2">
//         <span
//           className={`text-sm font-medium ${isToday ? "text-blue-600" : isPast ? "text-gray-500" : "text-gray-700"}`}
//         >
//           {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
//         </span>
//         {isToday && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Today</span>}
//       </div>

//       <div className="space-y-2">
//         {items.map((item) => (
//           <div
//             key={item._id}
//             className={`p-2 rounded text-xs ${
//               item.completed
//                 ? "bg-green-100 text-green-700"
//                 : `${ITEM_TYPES[item.type].lightColor} ${ITEM_TYPES[item.type].textColor}`
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1">
//                 <div className="w-4 h-4 flex-shrink-0">
//                   {item.completed ? <CheckCircle className="w-4 h-4" /> : ITEM_TYPES[item.type].icon}
//                 </div>
//                 <span className="font-medium capitalize truncate">{item.type}</span>
//               </div>
//               <span>{new Date(item.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
//             </div>
//             <div className="flex justify-between items-center mt-1">
//               <button
//                 onClick={() => window.open(getItemUrl(item.type, item.program), "_blank")}
//                 className="text-[#00A8FF] hover:underline text-xs"
//               >
//                 View
//               </button>
//               {!item.completed && (
//                 <button
//                   onClick={() => onComplete(item._id)}
//                   className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-2 py-0.5 rounded text-xs"
//                 >
//                   Complete
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // Main planner page component
// const PlannerPage = () => {
//   const [plannerItems, setPlannerItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [viewMode, setViewMode] = useState("list")
//   const [filterType, setFilterType] = useState("all")
//   const [filterDate, setFilterDate] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentWeek, setCurrentWeek] = useState(new Date())
//   const [processingItem, setProcessingItem] = useState(null)
//   const [showFilters, setShowFilters] = useState(false)

//   // Fetch planner data
//   useEffect(() => {
//     const fetchPlanner = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const res = await fetch("http://localhost:8000/api/planners", {
//           credentials: "include",
//         })

//         if (!res.ok) {
//           throw new Error(`Failed to load planner: ${res.status}`)
//         }

//         const data = await res.json()

//         if (data.success) {
//           setPlannerItems(data.plan || [])
//         } else {
//           throw new Error(data.message || "Failed to load planner")
//         }
//       } catch (err) {
//         console.error("Error loading planner:", err)
//         setError(err.message || "Failed to load planner. Please try again.")
//         toast.error(err.message || "Failed to load planner")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPlanner()
//   }, [])

//   // Mark item as complete
//   const handleComplete = async (itemId) => {
//     try {
//       setProcessingItem(itemId)

//       const res = await fetch(`http://localhost:8000/api/planners/complete/${itemId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       })

//       if (!res.ok) {
//         throw new Error(`Failed to mark as complete: ${res.status}`)
//       }

//       const data = await res.json()

//       if (data.success) {
//         toast.success("Item marked as complete!")
//         setPlannerItems((prev) => prev.map((item) => (item._id === itemId ? { ...item, completed: true } : item)))
//       } else {
//         throw new Error(data.message || "Failed to mark as complete")
//       }
//     } catch (err) {
//       console.error("Error marking item as complete:", err)
//       toast.error(err.message || "Failed to mark as complete")
//     } finally {
//       setProcessingItem(null)
//     }
//   }

//   // Reschedule item
//   const handleReschedule = async (itemId, newDate) => {
//     try {
//       setProcessingItem(itemId)

//       const res = await fetch(`http://localhost:8000/api/planners/drag/${itemId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ newDate: new Date(newDate).toISOString() }),
//       })

//       if (!res.ok) {
//         throw new Error(`Failed to reschedule: ${res.status}`)
//       }

//       const data = await res.json()

//       if (data.success) {
//         toast.success("Item rescheduled successfully!")
//         setPlannerItems((prev) => prev.map((item) => (item._id === itemId ? { ...item, date: newDate } : item)))
//       } else {
//         throw new Error(data.message || "Failed to reschedule item")
//       }
//     } catch (err) {
//       console.error("Error rescheduling item:", err)
//       toast.error(err.message || "Failed to reschedule item")
//     } finally {
//       setProcessingItem(null)
//     }
//   }

//   // Handle drop in calendar view
//   const handleDrop = (itemId, newDate) => {
//     // Create a new date object with the same time as the original item
//     const item = plannerItems.find((i) => i._id === itemId)
//     if (!item) return

//     const originalDate = new Date(item.date)
//     const droppedDate = new Date(newDate)
//     droppedDate.setHours(originalDate.getHours(), originalDate.getMinutes())

//     handleReschedule(itemId, droppedDate.toISOString())
//   }

//   // Filter items
//   const filteredItems = plannerItems.filter((item) => {
//     // Filter by type
//     if (filterType !== "all" && item.type !== filterType) return false

//     // Filter by date
//     if (filterDate === "today") {
//       if (!isToday(item.date)) return false
//     } else if (filterDate === "upcoming") {
//       if (isPast(item.date) || isToday(item.date)) return false
//     } else if (filterDate === "past") {
//       if (!isPast(item.date)) return false
//     }

//     return true
//   })

//   // Sort items by date (most recent first)
//   const sortedItems = [...filteredItems].sort((a, b) => new Date(a.date) - new Date(b.date))

//   // Calculate progress
//   const progress = {
//     total: plannerItems.length,
//     completed: plannerItems.filter((item) => item.completed).length,
//     percentage:
//       plannerItems.length > 0
//         ? Math.round((plannerItems.filter((item) => item.completed).length / plannerItems.length) * 100)
//         : 0,
//   }

//   // Generate calendar days for the current week
//   const generateCalendarDays = () => {
//     const days = []
//     const startOfWeek = new Date(currentWeek)
//     startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()) // Start from Sunday

//     for (let i = 0; i < 7; i++) {
//       const day = new Date(startOfWeek)
//       day.setDate(day.getDate() + i)
//       days.push(day)
//     }

//     return days
//   }

//   const calendarDays = generateCalendarDays()

//   // Navigate to previous/next week
//   const goToPreviousWeek = () => {
//     const prevWeek = new Date(currentWeek)
//     prevWeek.setDate(prevWeek.getDate() - 7)
//     setCurrentWeek(prevWeek)
//   }

//   const goToNextWeek = () => {
//     const nextWeek = new Date(currentWeek)
//     nextWeek.setDate(nextWeek.getDate() + 7)
//     setCurrentWeek(nextWeek)
//   }

//   // Group items by date for calendar view
//   const itemsByDate = {}
//   calendarDays.forEach((day) => {
//     const dateString = day.toDateString()
//     itemsByDate[dateString] = sortedItems.filter((item) => new Date(item.date).toDateString() === dateString)
//   })

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="min-h-screen bg-[#F7F7FD]">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white">
//           <div className="max-w-6xl mx-auto px-4 py-8">
//             <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Dashboard
//             </Link>

//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold">Your Planner</h1>
//                 <p className="text-white/80 mt-1">Track and manage your fitness activities</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5">
//                   <div className="flex">
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
//                         viewMode === "list" ? "bg-white text-[#00A8FF]" : "text-white hover:bg-white/10"
//                       }`}
//                     >
//                       <ListTodo className="w-4 h-4" />
//                       <span className="hidden sm:inline">List</span>
//                     </button>
//                     <button
//                       onClick={() => setViewMode("calendar")}
//                       className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
//                         viewMode === "calendar" ? "bg-white text-[#00A8FF]" : "text-white hover:bg-white/10"
//                       }`}
//                     >
//                       <CalendarDays className="w-4 h-4" />
//                       <span className="hidden sm:inline">Calendar</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="max-w-6xl mx-auto px-4 py-3">
//             <div className="flex items-center justify-between mb-1">
//               <span className="font-medium text-[#0E0E2C]">Progress</span>
//               <span className="text-[#00A8FF] font-medium">{progress.percentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-[#00A8FF] h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${progress.percentage}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>
//                 {progress.completed} of {progress.total} items completed
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           {/* Filters */}
//           <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-[#0E0E2C] hover:bg-gray-50 transition-colors"
//               >
//                 <Filter className="w-4 h-4" />
//                 <span>Filters</span>
//               </button>

//               {filterType !== "all" && (
//                 <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
//                   {ITEM_TYPES[filterType]?.icon}
//                   <span className="capitalize">{filterType}</span>
//                   <button onClick={() => setFilterType("all")} className="ml-1 text-blue-500 hover:text-blue-700">
//                     <X className="w-3 h-3" />
//                   </button>
//                 </div>
//               )}

//               {filterDate !== "all" && (
//                 <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
//                   <Calendar className="w-3 h-3" />
//                   <span className="capitalize">{filterDate}</span>
//                   <button onClick={() => setFilterDate("all")} className="ml-1 text-purple-500 hover:text-purple-700">
//                     <X className="w-3 h-3" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] w-full sm:w-64"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </div>
//           </div>

//           {/* Filter Panel */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="mb-6 overflow-hidden"
//               >
//                 <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="font-medium mb-3">Filter by Type</h3>
//                       <div className="flex flex-wrap gap-2">
//                         <button
//                           onClick={() => setFilterType("all")}
//                           className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                             filterType === "all"
//                               ? "bg-[#00A8FF] text-white"
//                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           All Types
//                         </button>
//                         {Object.keys(ITEM_TYPES).map((type) => (
//                           <button
//                             key={type}
//                             onClick={() => setFilterType(type)}
//                             className={`px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1.5 ${
//                               filterType === type
//                                 ? `${ITEM_TYPES[type].color} text-white`
//                                 : `${ITEM_TYPES[type].lightColor} ${ITEM_TYPES[type].textColor}`
//                             }`}
//                           >
//                             {ITEM_TYPES[type].icon}
//                             <span className="capitalize">{type}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-medium mb-3">Filter by Date</h3>
//                       <div className="flex flex-wrap gap-2">
//                         <button
//                           onClick={() => setFilterDate("all")}
//                           className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                             filterDate === "all"
//                               ? "bg-[#00A8FF] text-white"
//                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           All Dates
//                         </button>
//                         <button
//                           onClick={() => setFilterDate("today")}
//                           className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                             filterDate === "today"
//                               ? "bg-blue-600 text-white"
//                               : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                           }`}
//                         >
//                           Today
//                         </button>
//                         <button
//                           onClick={() => setFilterDate("upcoming")}
//                           className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                             filterDate === "upcoming"
//                               ? "bg-green-600 text-white"
//                               : "bg-green-100 text-green-700 hover:bg-green-200"
//                           }`}
//                         >
//                           Upcoming
//                         </button>
//                         <button
//                           onClick={() => setFilterDate("past")}
//                           className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                             filterDate === "past" ? "bg-red-600 text-white" : "bg-red-100 text-red-700 hover:bg-red-200"
//                           }`}
//                         >
//                           Past
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <Loader2 className="w-12 h-12 text-[#00A8FF] animate-spin mb-4" />
//               <p className="text-gray-500">Loading your planner...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//               <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to Load Planner</h3>
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : plannerItems.length === 0 ? (
//             <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
//               <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold mb-2">Your Planner is Empty</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 You don't have any activities scheduled yet. Enroll in a program to get started with your fitness
//                 journey.
//               </p>
//               <Link
//                 to="/programs"
//                 className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
//               >
//                 <Plus className="w-5 h-5" />
//                 Browse Programs
//               </Link>
//             </div>
//           ) : sortedItems.length === 0 ? (
//             <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
//               <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold mb-2">No Matching Activities</h3>
//               <p className="text-gray-500 mb-4">
//                 No activities match your current filters. Try adjusting your filters to see more results.
//               </p>
//               <button
//                 onClick={() => {
//                   setFilterType("all")
//                   setFilterDate("all")
//                   setSearchTerm("")
//                 }}
//                 className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg transition-colors"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           ) : viewMode === "list" ? (
//             // List View
//             <div className="space-y-4">
//               {Object.entries(groupByDate(sortedItems))
//                 .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
//                 .map(([date, items]) => (
//                   <div key={date} className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                       <CalendarDays className="w-5 h-5 text-[#00A8FF]" />
//                       {new Date(date).toLocaleDateString("en-US", {
//                         weekday: "long",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                       {isToday(date) && (
//                         <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Today</span>
//                       )}
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {items.map((item) => (
//                         <PlannerItem
//                           key={item._id}
//                           item={item}
//                           onComplete={handleComplete}
//                           onReschedule={handleReschedule}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           ) : (
//             // Calendar View
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold">
//                   {currentWeek.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={goToPreviousWeek}
//                     className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
//                     aria-label="Previous week"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => setCurrentWeek(new Date())}
//                     className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors"
//                   >
//                     Today
//                   </button>
//                   <button
//                     onClick={goToNextWeek}
//                     className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
//                     aria-label="Next week"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-7 gap-4">
//                 {/* Day headers */}
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                   <div key={day} className="text-center font-medium text-gray-600 mb-2">
//                     {day}
//                   </div>
//                 ))}

//                 {/* Calendar days */}
//                 {calendarDays.map((day) => (
//                   <CalendarDay
//                     key={day.toISOString()}
//                     date={day}
//                     items={itemsByDate[day.toDateString()] || []}
//                     onComplete={handleComplete}
//                     onReschedule={handleReschedule}
//                     onDrop={handleDrop}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </DndProvider>
//   )
// }

// export default PlannerPage


"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  Dumbbell,
  Soup,
  Salad,
  Brain,
  CalendarDays,
  ListTodo,
  Filter,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  Plus,
  Calendar,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { motion, AnimatePresence } from "framer-motion"

// Type definitions for planner items
const ITEM_TYPES = {
  workout: {
    icon: <Dumbbell className="w-5 h-5" />,
    color: "bg-blue-600",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-50",
  },
  meal: {
    icon: <Soup className="w-5 h-5" />,
    color: "bg-green-600",
    lightColor: "bg-green-100",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-green-50",
  },
  snack: {
    icon: <Salad className="w-5 h-5" />,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-100",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-200",
    hoverColor: "hover:bg-yellow-50",
  },
  meditation: {
    icon: <Brain className="w-5 h-5" />,
    color: "bg-purple-600",
    lightColor: "bg-purple-100",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    hoverColor: "hover:bg-purple-50",
  },
}

// Helper function to get the URL for an item
const getItemUrl = (type, id) => {
  if (!id) return "#"
  switch (type) {
    case "workout":
      return `/workout/${id}`
    case "meal":
      return `/meal/${id}`
    case "snack":
      return `/snack/${id}`
    case "meditation":
      return `/meditation/${id}`
    default:
      return "#"
  }
}

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

// Helper function to format time
const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// Helper function to get today's date at midnight
const getTodayDate = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

// Helper function to check if a date is today
const isToday = (dateString) => {
  const date = new Date(dateString)
  const today = getTodayDate()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// Helper function to check if a date is in the past
const isPast = (dateString) => {
  const date = new Date(dateString)
  const today = getTodayDate()
  return date < today
}

// Helper function to group items by date
const groupByDate = (items) => {
  const grouped = {}
  items.forEach((item) => {
    const date = new Date(item.date).toDateString()
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(item)
  })
  return grouped
}

// Draggable planner item component
const PlannerItem = ({ item, onComplete, onReschedule }) => {
  const navigate = useNavigate()
  const [{ isDragging }, drag] = useDrag({
    type: "PLANNER_ITEM",
    item: { id: item._id, type: item.type, date: item.date },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const itemType = ITEM_TYPES[item.type]
  const isPastItem = isPast(item.date)
  const isTodayItem = isToday(item.date)

  // Get program item details
  const programId = item.program
  const itemId = item._id

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`relative rounded-lg overflow-hidden border shadow-sm transition-all ${
        item.completed
          ? "border-green-200 bg-green-50"
          : isPastItem
            ? "border-red-200 bg-red-50"
            : isTodayItem
              ? "border-blue-200 bg-blue-50"
              : "border-gray-200 bg-white"
      } ${isDragging ? "shadow-md" : ""}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.completed ? "bg-green-500" : itemType.color
              } text-white`}
            >
              {item.completed ? <CheckCircle className="w-4 h-4" /> : itemType.icon}
            </div>
            <h3 className="font-medium capitalize">{item.type}</h3>
          </div>
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              item.completed
                ? "bg-green-100 text-green-700"
                : isPastItem
                  ? "bg-red-100 text-red-700"
                  : isTodayItem
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.completed ? "Completed" : isPastItem ? "Missed" : isTodayItem ? "Today" : formatDate(item.date)}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{formatTime(item.date)}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => navigate(getItemUrl(item.type, programId))}
            className="text-[#00A8FF] text-sm font-medium hover:underline"
          >
            View Details
          </button>

          {!item.completed && (
            <button
              onClick={() => onComplete(itemId)}
              className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Calendar day component
const CalendarDay = ({ date, items, onComplete, onReschedule, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "PLANNER_ITEM",
    drop: (droppedItem) => onDrop(droppedItem.id, date),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const isToday = new Date().toDateString() === date.toDateString()
  const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

  return (
    <div
      ref={drop}
      className={`border rounded-lg p-3 min-h-[150px] transition-colors ${
        isOver ? "bg-blue-50 border-blue-300" : isToday ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
      } ${isPast ? "opacity-70" : ""}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-sm font-medium ${isToday ? "text-blue-600" : isPast ? "text-gray-500" : "text-gray-700"}`}
        >
          {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </span>
        {isToday && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Today</span>}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item._id}
            className={`p-2 rounded text-xs ${
              item.completed
                ? "bg-green-100 text-green-700"
                : `${ITEM_TYPES[item.type].lightColor} ${ITEM_TYPES[item.type].textColor}`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 flex-shrink-0">
                  {item.completed ? <CheckCircle className="w-4 h-4" /> : ITEM_TYPES[item.type].icon}
                </div>
                <span className="font-medium capitalize truncate">{item.type}</span>
              </div>
              <span>{new Date(item.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <button
                onClick={() => window.open(getItemUrl(item.type, item.program), "_blank")}
                className="text-[#00A8FF] hover:underline text-xs"
              >
                View
              </button>
              {!item.completed && (
                <button
                  onClick={() => onComplete(item._id)}
                  className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-2 py-0.5 rounded text-xs"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main planner page component
const PlannerPage = () => {
  const [plannerItems, setPlannerItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState("list")
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [processingItem, setProcessingItem] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch planner data
  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("http://localhost:8000/api/planners", {
          credentials: "include",
        })

        if (!res.ok) {
          throw new Error(`Failed to load planner: ${res.status}`)
        }

        const data = await res.json()

        if (data.success) {
          setPlannerItems(data.plan || [])
        } else {
          throw new Error(data.message || "Failed to load planner")
        }
      } catch (err) {
        console.error("Error loading planner:", err)
        setError(err.message || "Failed to load planner. Please try again.")
        toast.error(err.message || "Failed to load planner")
      } finally {
        setLoading(false)
      }
    }

    fetchPlanner()
  }, [])

  // Mark item as complete
  const handleComplete = async (itemId) => {
    try {
      setProcessingItem(itemId)

      const res = await fetch(`http://localhost:8000/api/planners/complete/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error(`Failed to mark as complete: ${res.status}`)
      }

      const data = await res.json()

      if (data.success) {
        toast.success("Item marked as complete!")
        setPlannerItems((prev) => prev.map((item) => (item._id === itemId ? { ...item, completed: true } : item)))
      } else {
        throw new Error(data.message || "Failed to mark as complete")
      }
    } catch (err) {
      console.error("Error marking item as complete:", err)
      toast.error(err.message || "Failed to mark as complete")
    } finally {
      setProcessingItem(null)
    }
  }

  // Reschedule item
  const handleReschedule = async (itemId, newDate) => {
    try {
      setProcessingItem(itemId)

      const res = await fetch(`http://localhost:8000/api/planners/drag/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newDate: new Date(newDate).toISOString() }),
      })

      if (!res.ok) {
        throw new Error(`Failed to reschedule: ${res.status}`)
      }

      const data = await res.json()

      if (data.success) {
        toast.success("Item rescheduled successfully!")
        setPlannerItems((prev) => prev.map((item) => (item._id === itemId ? { ...item, date: newDate } : item)))
      } else {
        throw new Error(data.message || "Failed to reschedule item")
      }
    } catch (err) {
      console.error("Error rescheduling item:", err)
      toast.error(err.message || "Failed to reschedule item")
    } finally {
      setProcessingItem(null)
    }
  }

  // Handle drop in calendar view
  const handleDrop = (itemId, newDate) => {
    // Create a new date object with the same time as the original item
    const item = plannerItems.find((i) => i._id === itemId)
    if (!item) return

    const originalDate = new Date(item.date)
    const droppedDate = new Date(newDate)
    droppedDate.setHours(originalDate.getHours(), originalDate.getMinutes())

    handleReschedule(itemId, droppedDate.toISOString())
  }

  // Filter items
  const filteredItems = plannerItems.filter((item) => {
    // Filter by type
    if (filterType !== "all" && item.type !== filterType) return false

    // Filter by date
    if (filterDate === "today") {
      if (!isToday(item.date)) return false
    } else if (filterDate === "upcoming") {
      if (isPast(item.date) || isToday(item.date)) return false
    } else if (filterDate === "past") {
      if (!isPast(item.date)) return false
    }

    return true
  })

  // Sort items by date (most recent first)
  const sortedItems = [...filteredItems].sort((a, b) => new Date(a.date) - new Date(b.date))

  // Calculate progress
  const progress = {
    total: plannerItems.length,
    completed: plannerItems.filter((item) => item.completed).length,
    percentage:
      plannerItems.length > 0
        ? Math.round((plannerItems.filter((item) => item.completed).length / plannerItems.length) * 100)
        : 0,
  }

  // Generate calendar days for the current week
  const generateCalendarDays = () => {
    const days = []
    const startOfWeek = new Date(currentWeek)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()) // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(day.getDate() + i)
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Navigate to previous/next week
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek)
    prevWeek.setDate(prevWeek.getDate() - 7)
    setCurrentWeek(prevWeek)
  }

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setCurrentWeek(nextWeek)
  }

  // Group items by date for calendar view
  const itemsByDate = {}
  calendarDays.forEach((day) => {
    const dateString = day.toDateString()
    itemsByDate[dateString] = sortedItems.filter((item) => new Date(item.date).toDateString() === dateString)
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#F7F7FD]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Your Planner</h1>
                <p className="text-white/80 mt-1">Track and manage your fitness activities</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5">
                  <div className="flex">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                        viewMode === "list" ? "bg-white text-[#00A8FF]" : "text-white hover:bg-white/10"
                      }`}
                    >
                      <ListTodo className="w-4 h-4" />
                      <span className="hidden sm:inline">List</span>
                    </button>
                    <button
                      onClick={() => setViewMode("calendar")}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                        viewMode === "calendar" ? "bg-white text-[#00A8FF]" : "text-white hover:bg-white/10"
                      }`}
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span className="hidden sm:inline">Calendar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-[#0E0E2C]">Progress</span>
              <span className="text-[#00A8FF] font-medium">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#00A8FF] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>
                {progress.completed} of {progress.total} items completed
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-[#0E0E2C] hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {filterType !== "all" && (
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                  {ITEM_TYPES[filterType]?.icon}
                  <span className="capitalize">{filterType}</span>
                  <button onClick={() => setFilterType("all")} className="ml-1 text-blue-500 hover:text-blue-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filterDate !== "all" && (
                <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className="capitalize">{filterDate}</span>
                  <button onClick={() => setFilterDate("all")} className="ml-1 text-purple-500 hover:text-purple-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] w-full sm:w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Filter by Type</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setFilterType("all")}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            filterType === "all"
                              ? "bg-[#00A8FF] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          All Types
                        </button>
                        {Object.keys(ITEM_TYPES).map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1.5 ${
                              filterType === type
                                ? `${ITEM_TYPES[type].color} text-white`
                                : `${ITEM_TYPES[type].lightColor} ${ITEM_TYPES[type].textColor}`
                            }`}
                          >
                            {ITEM_TYPES[type].icon}
                            <span className="capitalize">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Filter by Date</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setFilterDate("all")}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            filterDate === "all"
                              ? "bg-[#00A8FF] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          All Dates
                        </button>
                        <button
                          onClick={() => setFilterDate("today")}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            filterDate === "today"
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          Today
                        </button>
                        <button
                          onClick={() => setFilterDate("upcoming")}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            filterDate === "upcoming"
                              ? "bg-green-600 text-white"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          Upcoming
                        </button>
                        <button
                          onClick={() => setFilterDate("past")}
                          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                            filterDate === "past" ? "bg-red-600 text-white" : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          Past
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#00A8FF] animate-spin mb-4" />
              <p className="text-gray-500">Loading your planner...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to Load Planner</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : plannerItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Planner is Empty</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You don't have any activities scheduled yet. Enroll in a program to get started with your fitness
                journey.
              </p>
              <Link
                to="/programs"
                className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Browse Programs
              </Link>
            </div>
          ) : sortedItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Matching Activities</h3>
              <p className="text-gray-500 mb-4">
                No activities match your current filters. Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => {
                  setFilterType("all")
                  setFilterDate("all")
                  setSearchTerm("")
                }}
                className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === "list" ? (
            // List View
            <div className="space-y-4">
              {Object.entries(groupByDate(sortedItems))
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, items]) => (
                  <div key={date} className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-[#00A8FF]" />
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                      {isToday(date) && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Today</span>
                      )}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((item) => (
                        <PlannerItem
                          key={item._id}
                          item={item}
                          onComplete={handleComplete}
                          onReschedule={handleReschedule}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            // Calendar View
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {currentWeek.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPreviousWeek}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                    aria-label="Previous week"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentWeek(new Date())}
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={goToNextWeek}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                    aria-label="Next week"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-600 mb-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day) => (
                  <CalendarDay
                    key={day.toISOString()}
                    date={day}
                    items={itemsByDate[day.toDateString()] || []}
                    onComplete={handleComplete}
                    onReschedule={handleReschedule}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  )
}

export default PlannerPage
