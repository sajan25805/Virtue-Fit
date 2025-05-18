
import { useEffect, useState, useRef } from "react"
import { useWorkoutStore } from "../../store/workout-store"
import { useMealStore } from "../../store/meal-store"
import { useSnackStore } from "../../store/snack-store"
import { useMeditationStore } from "../../store/meditation-store"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import {
  Plus,
  Calendar,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  Loader2,
  AlertCircle,
  Dumbbell,
  Utensils,
  Coffee,
  Wind,
  Info,
  Trash,
  MoveHorizontal,
  ImageIcon,
} from "lucide-react"

// Custom select component with thumbnails
const ThumbnailSelect = ({ items, value, onChange, placeholder, colorScheme, itemType, isLoading, error }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

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

  if (isLoading) {
    return (
      <div
        className={`w-full p-3 border ${colorScheme.border} rounded-lg ${colorScheme.bg} flex items-center justify-center`}
      >
        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        <span className="ml-2 text-gray-500">Loading {itemType}...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full p-3 border border-red-300 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
        <span className="text-sm">Failed to load {itemType}</span>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected item display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border ${colorScheme.border} rounded-lg ${colorScheme.bg} cursor-pointer flex items-center gap-3 pr-10 relative transition-all ${
          isOpen ? `ring-2 ${colorScheme.ring}` : ""
        }`}
      >
        {selectedItem ? (
          <>
            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <img
                src={getThumbnail(selectedItem) || "/placeholder.svg"}
                alt={getItemName(selectedItem)}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = `/placeholder.svg?height=40&width=40`
                }}
              />
            </div>
            <div className="overflow-hidden">
              <span className={`${colorScheme.text} font-medium block truncate`}>{getItemName(selectedItem)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">
                {selectedItem.type || selectedItem.category || selectedItem.dietaryType || itemType}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
              <ImageIcon className="w-5 h-5 text-gray-400 dark:text-gray-600" />
            </div>
            <span>{placeholder}</span>
          </div>
        )}
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isOpen ? "rotate-180" : ""
          } transition-transform ${colorScheme.text} w-4 h-4`}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-1 w-full bg-white dark:bg-[#2a2a42] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-hidden"
          >
            <div className="sticky top-0 bg-white dark:bg-[#2a2a42] p-2 border-b border-gray-200 dark:border-gray-700 z-10">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Search ${itemType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-[#1f1f3a] border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8FF] dark:focus:ring-[#00A8FF]"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(60vh-60px)]">
              {filteredItems.length > 0 ? (
                <div className="py-1">
                  <div
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#1f1f3a] cursor-pointer flex items-center text-gray-500 dark:text-gray-400"
                    onClick={() => {
                      onChange("")
                      setIsOpen(false)
                      setSearchTerm("")
                    }}
                  >
                    <span className="ml-2">None</span>
                  </div>

                  {filteredItems.map((item) => (
                    <div
                      key={item._id}
                      className={`px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#1f1f3a] cursor-pointer flex items-center gap-3 ${
                        value === item._id ? `${colorScheme.bg} ${colorScheme.text}` : ""
                      }`}
                      onClick={() => {
                        onChange(item._id)
                        setIsOpen(false)
                        setSearchTerm("")
                      }}
                    >
                      <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <img
                          src={getThumbnail(item) || "/placeholder.svg"}
                          alt={getItemName(item)}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = `/placeholder.svg?height=40&width=40`
                          }}
                        />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <span className="font-medium block truncate">{getItemName(item)}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">
                          {item.type || item.category || item.dietaryType || itemType}
                        </span>
                      </div>
                      {value === item._id && <Check className={`${colorScheme.text} w-4 h-4`} />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No {itemType} found matching "{searchTerm}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="bg-white dark:bg-[#1f1f3a] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3a3a52] text-gray-600 dark:text-gray-300 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white dark:bg-[#1f1f3a] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#3a3a52] text-gray-600 dark:text-gray-300 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
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

const ProgramForm = ({ selected, onClose, onSave, isSubmitting = false }) => {
  const [name, setName] = useState(selected?.name || "")
  const [goal, setGoal] = useState(selected?.goal || "")
  const [days, setDays] = useState(selected?.days || [])
  const [errors, setErrors] = useState({})

  const { workouts, fetchWorkouts, loading: loadingWorkouts, error: workoutsError } = useWorkoutStore()
  const { meals, fetchMeals, loading: loadingMeals, error: mealsError } = useMealStore()
  const { snacks, fetchSnacks, loading: loadingSnacks, error: snacksError } = useSnackStore()
  const { meditations, fetchMeditations, loading: loadingMeditations, error: meditationsError } = useMeditationStore()

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchWorkouts(), fetchMeals(), fetchSnacks(), fetchMeditations()])
      } catch (err) {
        toast.error("Failed to load some resources. Please try again.")
      }
    }

    loadData()
  }, [fetchWorkouts, fetchMeals, fetchSnacks, fetchMeditations])

  useEffect(() => {
    if (selected) {
      setName(selected.name || "")
      setGoal(selected.goal || "")
      setDays(selected.days?.length ? [...selected.days] : [])
    } else {
      setName("")
      setGoal("")
      setDays([])
    }
    setErrors({})
  }, [selected])

  const handleAddDay = () => {
    setDays([...days, { workout: "", meal: "", snack: "", meditation: "" }])
  }

  const handleChange = (index, field, value) => {
    const updated = [...days]
    updated[index][field] = value
    setDays(updated)

    // Clear error when user makes a change
    if (errors.days) {
      setErrors((prev) => ({ ...prev, days: null }))
    }
  }

  const handleRemoveDay = (index) => {
    const updated = days.filter((_, i) => i !== index)
    setDays(updated)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Program name is required"
    }

    if (!goal.trim()) {
      newErrors.goal = "Program goal is required"
    }

    if (days.length === 0) {
      newErrors.days = "At least one day is required"
    } else {
      // Check if at least one item is selected per day
      const emptyDays = days.findIndex((day) => !day.workout && !day.meal && !day.snack && !day.meditation)

      if (emptyDays !== -1) {
        newErrors.days = `Day ${emptyDays + 1} must have at least one item selected`
      }
    }

    return newErrors
  }

  const handleSubmit = async () => {
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      await onSave({ name, goal, days })
    } catch (err) {
      toast.error("Failed to save program")
    }
  }

  // Color schemes for different item types
  const colorSchemes = {
    workout: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-400",
      focus: "focus:ring-blue-500 focus:border-blue-500",
      badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      ring: "ring-blue-500 dark:ring-blue-700",
      icon: <Dumbbell className="w-5 h-5" />,
    },
    meal: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-700 dark:text-green-400",
      focus: "focus:ring-green-500 focus:border-green-500",
      badge: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      ring: "ring-green-500 dark:ring-green-700",
      icon: <Utensils className="w-5 h-5" />,
    },
    snack: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-yellow-700 dark:text-yellow-400",
      focus: "focus:ring-yellow-500 focus:border-yellow-500",
      badge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      ring: "ring-yellow-500 dark:ring-yellow-700",
      icon: <Coffee className="w-5 h-5" />,
    },
    meditation: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-400",
      focus: "focus:ring-purple-500 focus:border-purple-500",
      badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      ring: "ring-purple-500 dark:ring-purple-700",
      icon: <Wind className="w-5 h-5" />,
    },
  }

  const isLoading = loadingWorkouts || loadingMeals || loadingSnacks || loadingMeditations

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Program Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter program name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
            }}
            className={`w-full p-3 bg-white dark:bg-[#1f1f3a] border ${
              errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700"
            } rounded-lg focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none transition-all`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Program Goal <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="E.g., Weight loss, Muscle gain, Stress reduction"
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value)
              if (errors.goal) setErrors((prev) => ({ ...prev, goal: null }))
            }}
            className={`w-full p-3 bg-white dark:bg-[#1f1f3a] border ${
              errors.goal ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700"
            } rounded-lg focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none transition-all`}
          />
          {errors.goal && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.goal}</p>}
        </div>
      </div>

      {errors.days && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <p className="ml-3 text-sm text-red-600 dark:text-red-400">{errors.days}</p>
        </div>
      )}

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
            className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
            disabled={isSubmitting}
          >
            <Plus className="w-4 h-4" /> Add Day
          </button>
        }
      >
        {days.length === 0 ? (
          <div className="bg-gray-50 dark:bg-[#1f1f3a] rounded-lg p-6 text-center min-w-full border border-dashed border-gray-300 dark:border-gray-700">
            <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No days added yet. Click "Add Day" to start building your program.
            </p>
            <button
              onClick={handleAddDay}
              className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg flex items-center gap-1.5 mx-auto transition-colors"
              disabled={isSubmitting}
            >
              <Plus className="w-4 h-4" /> Add First Day
            </button>
          </div>
        ) : (
          days.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#2a2a42] p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 relative min-w-[320px] max-w-[380px] flex-shrink-0"
            >
              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={() => handleRemoveDay(index)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full h-7 w-7 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  aria-label="Remove day"
                  disabled={isSubmitting}
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full h-7 w-7 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-move"
                  aria-label="Reorder day"
                  disabled={isSubmitting}
                >
                  <MoveHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center mb-4">
                <div className="bg-[#00A8FF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm font-bold">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Day {index + 1}</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`flex items-center gap-1.5 text-sm font-medium ${colorSchemes.workout.text} mb-1.5`}
                  >
                    {colorSchemes.workout.icon}
                    <span>Workout</span>
                  </label>
                  <ThumbnailSelect
                    items={workouts}
                    value={day.workout}
                    onChange={(value) => handleChange(index, "workout", value)}
                    placeholder="Select Workout"
                    colorScheme={colorSchemes.workout}
                    itemType="workouts"
                    isLoading={loadingWorkouts}
                    error={workoutsError}
                  />
                </div>

                <div>
                  <label className={`flex items-center gap-1.5 text-sm font-medium ${colorSchemes.meal.text} mb-1.5`}>
                    {colorSchemes.meal.icon}
                    <span>Meal</span>
                  </label>
                  <ThumbnailSelect
                    items={meals}
                    value={day.meal}
                    onChange={(value) => handleChange(index, "meal", value)}
                    placeholder="Select Meal"
                    colorScheme={colorSchemes.meal}
                    itemType="meals"
                    isLoading={loadingMeals}
                    error={mealsError}
                  />
                </div>

                <div>
                  <label className={`flex items-center gap-1.5 text-sm font-medium ${colorSchemes.snack.text} mb-1.5`}>
                    {colorSchemes.snack.icon}
                    <span>Snack</span>
                  </label>
                  <ThumbnailSelect
                    items={snacks}
                    value={day.snack}
                    onChange={(value) => handleChange(index, "snack", value)}
                    placeholder="Select Snack"
                    colorScheme={colorSchemes.snack}
                    itemType="snacks"
                    isLoading={loadingSnacks}
                    error={snacksError}
                  />
                </div>

                <div>
                  <label
                    className={`flex items-center gap-1.5 text-sm font-medium ${colorSchemes.meditation.text} mb-1.5`}
                  >
                    {colorSchemes.meditation.icon}
                    <span>Meditation</span>
                  </label>
                  <ThumbnailSelect
                    items={meditations}
                    value={day.meditation}
                    onChange={(value) => handleChange(index, "meditation", value)}
                    placeholder="Select Meditation"
                    colorScheme={colorSchemes.meditation}
                    itemType="meditations"
                    isLoading={loadingMeditations}
                    error={meditationsError}
                  />
                </div>

                {/* Selected items summary */}
                <div className="mt-4 bg-gray-50 dark:bg-[#1f1f3a] rounded-lg p-3 border border-gray-100 dark:border-gray-800">
                  <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                    Day Summary
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {day.workout && (
                      <span
                        className={`${colorSchemes.workout.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <img
                            src={
                              workouts.find((w) => w._id === day.workout)?.thumbnail ||
                              `/placeholder.svg?height=20&width=20` ||
                              "/placeholder.svg"
                            }
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=20&width=20`
                            }}
                          />
                        </div>
                        {workouts.find((w) => w._id === day.workout)?.title || "Workout"}
                      </span>
                    )}
                    {day.meal && (
                      <span
                        className={`${colorSchemes.meal.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <img
                            src={
                              meals.find((m) => m._id === day.meal)?.thumbnail || `/placeholder.svg?height=20&width=20`
                            }
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=20&width=20`
                            }}
                          />
                        </div>
                        {meals.find((m) => m._id === day.meal)?.name || "Meal"}
                      </span>
                    )}
                    {day.snack && (
                      <span
                        className={`${colorSchemes.snack.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <img
                            src={
                              snacks.find((s) => s._id === day.snack)?.thumbnail ||
                              `/placeholder.svg?height=20&width=20` ||
                              "/placeholder.svg"
                            }
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=20&width=20`
                            }}
                          />
                        </div>
                        {snacks.find((s) => s._id === day.snack)?.name || "Snack"}
                      </span>
                    )}
                    {day.meditation && (
                      <span
                        className={`${colorSchemes.meditation.badge} text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      >
                        <div className="h-4 w-4 rounded overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <img
                            src={
                              meditations.find((m) => m._id === day.meditation)?.thumbnail ||
                              `/placeholder.svg?height=20&width=20` ||
                              "/placeholder.svg"
                            }
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=20&width=20`
                            }}
                          />
                        </div>
                        {meditations.find((m) => m._id === day.meditation)?.title || "Meditation"}
                      </span>
                    )}
                    {!day.workout && !day.meal && !day.snack && !day.meditation && (
                      <span className="text-sm text-gray-400 dark:text-gray-500">No items selected</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </ScrollableContainer>

      <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#00A8FF] hover:bg-[#0096E6] px-6 py-2 rounded-lg text-white transition-colors flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {selected ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{selected ? "Update Program" : "Create Program"}</>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProgramForm
