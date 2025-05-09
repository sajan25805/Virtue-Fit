
// import { useEffect, useState, useRef } from "react"
// import toast from "react-hot-toast"
// import { useWorkoutStore } from "../../store/workout-store"
// import { useMealStore } from "../../store/meal-store"
// import { useSnackStore } from "../../store/snack-store"
// import { useMeditationStore } from "../../store/meditation-store"
// import { X, Plus, Calendar, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react"

// // Scrollable container component
// const ScrollableContainer = ({ children, title, actionButton }) => {
//   const scrollContainerRef = useRef(null)

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
//     }
//   }

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
//     }
//   }

//   return (
//     <div className="mt-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-[#0E0E2C] flex items-center gap-2">{title}</h3>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={scrollLeft}
//             className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center transition"
//             aria-label="Scroll left"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </button>
//           <button
//             onClick={scrollRight}
//             className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center transition"
//             aria-label="Scroll right"
//           >
//             <ArrowRight className="w-4 h-4" />
//           </button>
//           {actionButton}
//         </div>
//       </div>

//       <div
//         ref={scrollContainerRef}
//         className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//         style={{
//           scrollbarWidth: "thin",
//           msOverflowStyle: "none",
//           scrollbarColor: "#CBD5E0 transparent",
//         }}
//       >
//         {children}
//       </div>

//       <style jsx>{`
//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 6px;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background-color: #CBD5E0;
//           border-radius: 20px;
//         }
        
//         /* Hide scrollbar for IE, Edge and Firefox */
//         .scrollbar-thin {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: thin;  /* Firefox */
//         }
//       `}</style>
//     </div>
//   )
// }

// const ProgramForm = ({ selected, onClose, onSave }) => {
//   const [name, setName] = useState(selected?.name || "")
//   const [goal, setGoal] = useState(selected?.goal || "")
//   const [days, setDays] = useState(selected?.days || [])

//   const { workouts, fetchWorkouts } = useWorkoutStore()
//   const { meals, fetchMeals } = useMealStore()
//   const { snacks, fetchSnacks } = useSnackStore()
//   const { meditations, fetchMeditations } = useMeditationStore()

//   useEffect(() => {
//     fetchWorkouts()
//     fetchMeals()
//     fetchSnacks()
//     fetchMeditations()
//   }, [])

//   const handleAddDay = () => {
//     setDays([...days, { workout: "", meal: "", snack: "", meditation: "" }])
//   }

//   const handleChange = (index, field, value) => {
//     const updated = [...days]
//     updated[index][field] = value
//     setDays(updated)
//   }

//   const handleRemoveDay = (index) => {
//     const updated = days.filter((_, i) => i !== index)
//     setDays(updated)
//   }

//   const handleSubmit = async () => {
//     if (!name || !goal || days.length === 0) {
//       toast.error("Fill all fields and add at least one day.")
//       return
//     }
//     onSave({ name, goal, days })
//   }

//   // Color schemes for different item types
//   const colorSchemes = {
//     workout: {
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//       text: "text-blue-700",
//       focus: "focus:ring-blue-500 focus:border-blue-500",
//       badge: "bg-blue-100 text-blue-600",
//     },
//     meal: {
//       bg: "bg-green-50",
//       border: "border-green-200",
//       text: "text-green-700",
//       focus: "focus:ring-green-500 focus:border-green-500",
//       badge: "bg-green-100 text-green-600",
//     },
//     snack: {
//       bg: "bg-yellow-50",
//       border: "border-yellow-200",
//       text: "text-yellow-700",
//       focus: "focus:ring-yellow-500 focus:border-yellow-500",
//       badge: "bg-yellow-100 text-yellow-600",
//     },
//     meditation: {
//       bg: "bg-purple-50",
//       border: "border-purple-200",
//       text: "text-purple-700",
//       focus: "focus:ring-purple-500 focus:border-purple-500",
//       badge: "bg-purple-100 text-purple-600",
//     },
//   }

//   return (
//     <div className="space-y-4 bg-white">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-[#0E0E2C]">{selected ? "Edit Program" : "Create Program"}</h2>
//         <button
//           onClick={onClose}
//           className="text-gray-400 hover:text-gray-600 rounded-full h-8 w-8 flex items-center justify-center"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
//           <input
//             type="text"
//             placeholder="Enter program name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none transition bg-white"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Program Goal</label>
//           <input
//             type="text"
//             placeholder="E.g., Weight loss, Muscle gain, Stress reduction"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none transition bg-white"
//           />
//         </div>
//       </div>

//       <ScrollableContainer
//         title={
//           <div className="flex items-center gap-2">
//             <Calendar className="h-5 w-5 text-[#00A8FF]" />
//             <span>Program Days</span>
//             <span className="bg-[#00A8FF] text-white text-xs px-2 py-0.5 rounded-full">{days.length}</span>
//           </div>
//         }
//         actionButton={
//           <button
//             onClick={handleAddDay}
//             className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
//           >
//             <Plus className="w-4 h-4" /> Add Day
//           </button>
//         }
//       >
//         {days.length === 0 ? (
//           <div className="bg-gray-50 rounded-lg p-6 text-center min-w-full">
//             <p className="text-gray-500">No days added yet. Click "Add Day" to start building your program.</p>
//           </div>
//         ) : (
//           days.map((day, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative min-w-[300px] max-w-[350px] flex-shrink-0"
//             >
//               <button
//                 onClick={() => handleRemoveDay(index)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-red-500 rounded-full h-6 w-6 flex items-center justify-center"
//               >
//                 <X className="w-4 h-4" />
//               </button>

//               <h4 className="font-semibold text-[#0E0E2C] mb-4 flex items-center">
//                 <span className="bg-[#00A8FF] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
//                   {index + 1}
//                 </span>
//                 Day {index + 1}
//               </h4>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-blue-700 mb-1">Workout</label>
//                   <div className="relative">
//                     <select
//                       value={day.workout}
//                       onChange={(e) => handleChange(index, "workout", e.target.value)}
//                       className={`w-full p-3 border ${colorSchemes.workout.border} rounded-md appearance-none ${colorSchemes.workout.focus} outline-none transition pr-10 ${colorSchemes.workout.bg}`}
//                     >
//                       <option value="">Select Workout</option>
//                       {workouts.map((w) => (
//                         <option key={w._id} value={w._id}>
//                           {w.title}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown
//                       className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colorSchemes.workout.text} pointer-events-none w-4 h-4`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-green-700 mb-1">Meal</label>
//                   <div className="relative">
//                     <select
//                       value={day.meal}
//                       onChange={(e) => handleChange(index, "meal", e.target.value)}
//                       className={`w-full p-3 border ${colorSchemes.meal.border} rounded-md appearance-none ${colorSchemes.meal.focus} outline-none transition pr-10 ${colorSchemes.meal.bg}`}
//                     >
//                       <option value="">Select Meal</option>
//                       {meals.map((m) => (
//                         <option key={m._id} value={m._id}>
//                           {m.name}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown
//                       className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colorSchemes.meal.text} pointer-events-none w-4 h-4`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-yellow-700 mb-1">Snack</label>
//                   <div className="relative">
//                     <select
//                       value={day.snack}
//                       onChange={(e) => handleChange(index, "snack", e.target.value)}
//                       className={`w-full p-3 border ${colorSchemes.snack.border} rounded-md appearance-none ${colorSchemes.snack.focus} outline-none transition pr-10 ${colorSchemes.snack.bg}`}
//                     >
//                       <option value="">Select Snack</option>
//                       {snacks.map((s) => (
//                         <option key={s._id} value={s._id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown
//                       className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colorSchemes.snack.text} pointer-events-none w-4 h-4`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-purple-700 mb-1">Meditation</label>
//                   <div className="relative">
//                     <select
//                       value={day.meditation}
//                       onChange={(e) => handleChange(index, "meditation", e.target.value)}
//                       className={`w-full p-3 border ${colorSchemes.meditation.border} rounded-md appearance-none ${colorSchemes.meditation.focus} outline-none transition pr-10 ${colorSchemes.meditation.bg}`}
//                     >
//                       <option value="">Select Meditation</option>
//                       {meditations.map((m) => (
//                         <option key={m._id} value={m._id}>
//                           {m.title}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown
//                       className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colorSchemes.meditation.text} pointer-events-none w-4 h-4`}
//                     />
//                   </div>
//                 </div>

//                 {/* Selected items summary */}
//                 <div className="mt-4 bg-gray-50 rounded-md p-3">
//                   <div className="flex flex-wrap gap-2">
//                     {day.workout && (
//                       <span className={`${colorSchemes.workout.badge} text-xs px-2 py-1 rounded-full`}>
//                         {workouts.find((w) => w._id === day.workout)?.title || "Workout"}
//                       </span>
//                     )}
//                     {day.meal && (
//                       <span className={`${colorSchemes.meal.badge} text-xs px-2 py-1 rounded-full`}>
//                         {meals.find((m) => m._id === day.meal)?.name || "Meal"}
//                       </span>
//                     )}
//                     {day.snack && (
//                       <span className={`${colorSchemes.snack.badge} text-xs px-2 py-1 rounded-full`}>
//                         {snacks.find((s) => s._id === day.snack)?.name || "Snack"}
//                       </span>
//                     )}
//                     {day.meditation && (
//                       <span className={`${colorSchemes.meditation.badge} text-xs px-2 py-1 rounded-full`}>
//                         {meditations.find((m) => m._id === day.meditation)?.title || "Meditation"}
//                       </span>
//                     )}
//                     {!day.workout && !day.meal && !day.snack && !day.meditation && (
//                       <span className="text-sm text-gray-400">No items selected</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </ScrollableContainer>

//       <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-md text-white transition"
//         >
//           {selected ? "Update Program" : "Create Program"}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ProgramForm


"use client"

import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { useWorkoutStore } from "../../store/workout-store"
import { useMealStore } from "../../store/meal-store"
import { useSnackStore } from "../../store/snack-store"
import { useMeditationStore } from "../../store/meditation-store"
import { X, Plus, Calendar, ChevronDown, ArrowLeft, ArrowRight, Check } from "lucide-react"

// Custom select component with thumbnails
const ThumbnailSelect = ({ items, value, onChange, placeholder, colorScheme, itemType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)

  const selectedItem = items.find((item) => item._id === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter items based on search term
  const filteredItems = items.filter((item) => {
    const itemName = item.name || item.title || ""
    return itemName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Get the appropriate name field based on item type
  const getItemName = (item) => {
    return item.name || item.title || "Unnamed"
  }

  // Get thumbnail URL with fallback
  const getThumbnail = (item) => {
    return item.thumbnail || item.image || `/placeholder.svg?height=40&width=40`
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected item display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border ${colorScheme.border} rounded-md ${colorScheme.bg} cursor-pointer flex items-center gap-3 pr-10 relative`}
      >
        {selectedItem ? (
          <>
            <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0 bg-white">
              <img
                src={getThumbnail(selectedItem) || "/placeholder.svg"}
                alt={getItemName(selectedItem)}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = `/placeholder.svg?height=40&width=40`
                }}
              />
            </div>
            <span className={`${colorScheme.text} truncate`}>{getItemName(selectedItem)}</span>
          </>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isOpen ? "rotate-180" : ""
          } transition-transform ${colorScheme.text} w-4 h-4`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="py-1">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-500"
                onClick={() => {
                  onChange("")
                  setIsOpen(false)
                }}
              >
                <span className="ml-2">None</span>
              </div>

              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 ${
                    value === item._id ? `${colorScheme.bg} ${colorScheme.text}` : ""
                  }`}
                  onClick={() => {
                    onChange(item._id)
                    setIsOpen(false)
                  }}
                >
                  <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0 bg-white border border-gray-200">
                    <img
                      src={getThumbnail(item) || "/placeholder.svg"}
                      alt={getItemName(item)}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = `/placeholder.svg?height=40&width=40`
                      }}
                    />
                  </div>
                  <span className="truncate">{getItemName(item)}</span>
                  {value === item._id && <Check className={`ml-auto ${colorScheme.text} w-4 h-4`} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No {itemType} found</div>
          )}
        </div>
      )}
    </div>
  )
}

// Scrollable container component
const ScrollableContainer = ({ children, title, actionButton }) => {
  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0E0E2C] flex items-center gap-2">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center transition"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 h-8 w-8 rounded-full flex items-center justify-center transition"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          {actionButton}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
          scrollbarColor: "#CBD5E0 transparent",
        }}
      >
        {children}
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #CBD5E0;
          border-radius: 20px;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-thin {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: thin;  /* Firefox */
        }
      `}</style>
    </div>
  )
}

const ProgramForm = ({ selected, onClose, onSave }) => {
  const [name, setName] = useState(selected?.name || "")
  const [goal, setGoal] = useState(selected?.goal || "")
  const [days, setDays] = useState(selected?.days || [])

  const { workouts, fetchWorkouts } = useWorkoutStore()
  const { meals, fetchMeals } = useMealStore()
  const { snacks, fetchSnacks } = useSnackStore()
  const { meditations, fetchMeditations } = useMeditationStore()

  useEffect(() => {
    fetchWorkouts()
    fetchMeals()
    fetchSnacks()
    fetchMeditations()
  }, [])

  const handleAddDay = () => {
    setDays([...days, { workout: "", meal: "", snack: "", meditation: "" }])
  }

  const handleChange = (index, field, value) => {
    const updated = [...days]
    updated[index][field] = value
    setDays(updated)
  }

  const handleRemoveDay = (index) => {
    const updated = days.filter((_, i) => i !== index)
    setDays(updated)
  }

  const handleSubmit = async () => {
    if (!name || !goal || days.length === 0) {
      toast.error("Fill all fields and add at least one day.")
      return
    }
    onSave({ name, goal, days })
  }

  // Color schemes for different item types
  const colorSchemes = {
    workout: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      focus: "focus:ring-blue-500 focus:border-blue-500",
      badge: "bg-blue-100 text-blue-600",
    },
    meal: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      focus: "focus:ring-green-500 focus:border-green-500",
      badge: "bg-green-100 text-green-600",
    },
    snack: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      focus: "focus:ring-yellow-500 focus:border-yellow-500",
      badge: "bg-yellow-100 text-yellow-600",
    },
    meditation: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      focus: "focus:ring-purple-500 focus:border-purple-500",
      badge: "bg-purple-100 text-purple-600",
    },
  }

  return (
    <div className="space-y-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#0E0E2C]">{selected ? "Edit Program" : "Create Program"}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 rounded-full h-8 w-8 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
          <input
            type="text"
            placeholder="Enter program name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none transition bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program Goal</label>
          <input
            type="text"
            placeholder="E.g., Weight loss, Muscle gain, Stress reduction"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none transition bg-white"
          />
        </div>
      </div>

      <ScrollableContainer
        title={
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#00A8FF]" />
            <span>Program Days</span>
            <span className="bg-[#00A8FF] text-white text-xs px-2 py-0.5 rounded-full">{days.length}</span>
          </div>
        }
        actionButton={
          <button
            onClick={handleAddDay}
            className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4" /> Add Day
          </button>
        }
      >
        {days.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center min-w-full">
            <p className="text-gray-500">No days added yet. Click "Add Day" to start building your program.</p>
          </div>
        ) : (
          days.map((day, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative min-w-[300px] max-w-[350px] flex-shrink-0"
            >
              <button
                onClick={() => handleRemoveDay(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 rounded-full h-6 w-6 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="font-semibold text-[#0E0E2C] mb-4 flex items-center">
                <span className="bg-[#00A8FF] text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                  {index + 1}
                </span>
                Day {index + 1}
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Workout</label>
                  <ThumbnailSelect
                    items={workouts}
                    value={day.workout}
                    onChange={(value) => handleChange(index, "workout", value)}
                    placeholder="Select Workout"
                    colorScheme={colorSchemes.workout}
                    itemType="workouts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Meal</label>
                  <ThumbnailSelect
                    items={meals}
                    value={day.meal}
                    onChange={(value) => handleChange(index, "meal", value)}
                    placeholder="Select Meal"
                    colorScheme={colorSchemes.meal}
                    itemType="meals"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-yellow-700 mb-1">Snack</label>
                  <ThumbnailSelect
                    items={snacks}
                    value={day.snack}
                    onChange={(value) => handleChange(index, "snack", value)}
                    placeholder="Select Snack"
                    colorScheme={colorSchemes.snack}
                    itemType="snacks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">Meditation</label>
                  <ThumbnailSelect
                    items={meditations}
                    value={day.meditation}
                    onChange={(value) => handleChange(index, "meditation", value)}
                    placeholder="Select Meditation"
                    colorScheme={colorSchemes.meditation}
                    itemType="meditations"
                  />
                </div>

                {/* Selected items summary */}
                <div className="mt-4 bg-gray-50 rounded-md p-3">
                  <div className="flex flex-wrap gap-2">
                    {day.workout && (
                      <span
                        className={`${colorSchemes.workout.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden">
                          <img
                            src={
                              workouts.find((w) => w._id === day.workout)?.thumbnail ||
                              `/placeholder.svg?height=20&width=20`
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {workouts.find((w) => w._id === day.workout)?.title || "Workout"}
                      </span>
                    )}
                    {day.meal && (
                      <span
                        className={`${colorSchemes.meal.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden">
                          <img
                            src={
                              meals.find((m) => m._id === day.meal)?.thumbnail || `/placeholder.svg?height=20&width=20`
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {meals.find((m) => m._id === day.meal)?.name || "Meal"}
                      </span>
                    )}
                    {day.snack && (
                      <span
                        className={`${colorSchemes.snack.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden">
                          <img
                            src={
                              snacks.find((s) => s._id === day.snack)?.thumbnail ||
                              `/placeholder.svg?height=20&width=20`
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {snacks.find((s) => s._id === day.snack)?.name || "Snack"}
                      </span>
                    )}
                    {day.meditation && (
                      <span
                        className={`${colorSchemes.meditation.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden">
                          <img
                            src={
                              meditations.find((m) => m._id === day.meditation)?.thumbnail ||
                              `/placeholder.svg?height=20&width=20`
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {meditations.find((m) => m._id === day.meditation)?.title || "Meditation"}
                      </span>
                    )}
                    {!day.workout && !day.meal && !day.snack && !day.meditation && (
                      <span className="text-sm text-gray-400">No items selected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollableContainer>

      <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-md text-white transition"
        >
          {selected ? "Update Program" : "Create Program"}
        </button>
      </div>
    </div>
  )
}

export default ProgramForm
