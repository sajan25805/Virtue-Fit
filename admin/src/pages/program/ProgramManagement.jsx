
import { useEffect, useState } from "react"
import { useProgramStore } from "../../store/program-store"
import ProgramForm from "./ProgramForm"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  Layers,
  Plus,
  Trash2,
  Pencil,
  Loader2,
  Calendar,
  Users,
  Target,
  Search,
  AlertCircle,
  CheckCircle,
  X,
  Clock,
  Dumbbell,
  Utensils,
  Wind,
  Coffee,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

export default function ProgramManagement() {
  const { programs, fetchPrograms, createProgram, updateProgram, deleteProgram, loading } = useProgramStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterActive, setFilterActive] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enrolledUsers, setEnrolledUsers] = useState({})
  const [loadingEnrollments, setLoadingEnrollments] = useState({})
  const [enrollmentErrors, setEnrollmentErrors] = useState({})
  const [expandedPrograms, setExpandedPrograms] = useState({})

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        await fetchPrograms()
      } catch (err) {
        setError("Failed to load programs. Please try again.")
        toast.error("Failed to load programs")
      }
    }

    loadPrograms()
  }, [fetchPrograms])

  const fetchEnrolledUsers = async (programId) => {
    if (enrolledUsers[programId] || loadingEnrollments[programId]) return

    try {
      setLoadingEnrollments((prev) => ({ ...prev, [programId]: true }))
      setEnrollmentErrors((prev) => ({ ...prev, [programId]: null }))

      const response = await fetch(`http://localhost:8000/api/programs/${programId}/enrollments`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch enrollments: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setEnrolledUsers((prev) => ({ ...prev, [programId]: data.users || [] }))
      } else {
        throw new Error(data.message || "Failed to fetch enrollments")
      }
    } catch (err) {
      console.error(`Error fetching enrollments for program ${programId}:`, err)
      setEnrollmentErrors((prev) => ({ ...prev, [programId]: err.message || "Failed to load enrolled users" }))
      toast.error(`Failed to load enrolled users for program`)
    } finally {
      setLoadingEnrollments((prev) => ({ ...prev, [programId]: false }))
    }
  }

  const toggleProgramExpansion = (programId) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [programId]: !prev[programId],
    }))

    if (!expandedPrograms[programId] && !enrolledUsers[programId]) {
      fetchEnrolledUsers(programId)
    }
  }

  const handleSave = async (data) => {
    try {
      setIsSubmitting(true)
      const res = editingProgram ? await updateProgram(editingProgram._id, data) : await createProgram(data)

      if (res?.success) {
        toast.success(`Program ${editingProgram ? "updated" : "created"} successfully!`)
        setShowForm(false)
        setEditingProgram(null)
      } else {
        throw new Error(res?.message || "Operation failed")
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteProgram(confirmDeleteId)
      if (res?.success) {
        toast.success("Program deleted successfully")
      } else {
        throw new Error(res?.message || "Deletion failed")
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete program")
    } finally {
      setConfirmDeleteId(null)
    }
  }

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.goal?.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterActive === "active") return matchesSearch && program.active
    if (filterActive === "inactive") return matchesSearch && !program.active

    return matchesSearch
  })

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#0E0E2C] dark:to-[#1f1f3a] text-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Layers className="h-8 w-8 text-[#00A8FF]" />
              Program Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Create and manage fitness programs for your clients</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white dark:bg-[#2a2a42] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8FF] transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <button
              onClick={() => {
                setShowForm(true)
                setEditingProgram(null)
              }}
              className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white transition-colors shadow-sm hover:shadow"
              disabled={loading}
            >
              <Plus className="w-5 h-5" />
              <span>Create Program</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-white dark:bg-[#2a2a42] rounded-lg p-1 shadow-sm">
            <div className="flex">
              <button
                onClick={() => setFilterActive("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterActive === "all"
                    ? "bg-[#00A8FF] text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3a3a52]"
                }`}
              >
                All Programs
              </button>
              <button
                onClick={() => setFilterActive("active")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterActive === "active"
                    ? "bg-[#00A8FF] text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3a3a52]"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterActive("inactive")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterActive === "inactive"
                    ? "bg-[#00A8FF] text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3a3a52]"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {filteredPrograms.length} {filteredPrograms.length === 1 ? "program" : "programs"} found
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error loading programs</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null)
                      fetchPrograms()
                    }}
                    className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && !error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-[#00A8FF] animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">Loading programs...</p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="bg-white dark:bg-[#2a2a42] rounded-xl p-8 text-center shadow-sm">
            {searchTerm || filterActive !== "all" ? (
              <>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No matching programs</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  No programs found matching your criteria. Try adjusting your search or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterActive("all")
                  }}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#00A8FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#00A8FF]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Programs Yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Create your first fitness program to help clients achieve their goals with structured workout and
                  nutrition plans.
                </p>
                <button
                  onClick={() => {
                    setShowForm(true)
                    setEditingProgram(null)
                  }}
                  className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-lg flex items-center gap-2 mx-auto text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Program
                </button>
              </>
            )}
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <motion.div
                  key={program._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#2a2a42] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold mb-2 pr-16">{program.name}</h3>
                      <div className="flex items-center gap-1">
                        {program.active ? (
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Active
                          </span>
                        ) : (
                          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-4 h-4 text-[#00A8FF]" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{program.goal}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {program.days?.length || 0} {program.days?.length === 1 ? "Day" : "Days"}
                      </span>

                      <span className="mx-2">•</span>

                      <Clock className="w-3.5 h-3.5" />
                      <span>Created {new Date(program.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="space-y-2">
                      {program.days?.slice(0, 3).map((day, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 dark:bg-[#1f1f3a] rounded-lg p-3 text-xs border border-gray-100 dark:border-gray-800"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium flex items-center">
                              <span className="bg-[#00A8FF] text-white w-5 h-5 rounded-full flex items-center justify-center mr-1.5">
                                {idx + 1}
                              </span>
                              Day {idx + 1}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {day.workout && (
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Dumbbell className="w-3 h-3 mr-1" /> Workout
                              </span>
                            )}
                            {day.meal && (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Utensils className="w-3 h-3 mr-1" /> Meal
                              </span>
                            )}
                            {day.snack && (
                              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Coffee className="w-3 h-3 mr-1" /> Snack
                              </span>
                            )}
                            {day.meditation && (
                              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Wind className="w-3 h-3 mr-1" /> Meditation
                              </span>
                            )}
                          </div>
                        </div>
                      ))}

                      {program.days?.length > 3 && (
                        <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-1">
                          +{program.days.length - 3} more days
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1f1f3a] p-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => toggleProgramExpansion(program._id)}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-[#00A8FF] dark:hover:text-[#00A8FF] transition-colors"
                      >
                        <Users className="w-4 h-4 mr-1.5" />
                        <span>Enrolled Users</span>
                        {expandedPrograms[program._id] ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProgram(program)
                            setShowForm(true)
                          }}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[#00A8FF] hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                          aria-label="Edit program"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(program._id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                          aria-label="Delete program"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedPrograms[program._id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            {loadingEnrollments[program._id] ? (
                              <div className="flex justify-center py-4">
                                <Loader2 className="w-5 h-5 text-[#00A8FF] animate-spin" />
                              </div>
                            ) : enrollmentErrors[program._id] ? (
                              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                                <div className="flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-2" />
                                  <span>{enrollmentErrors[program._id]}</span>
                                </div>
                                <button
                                  onClick={() => fetchEnrolledUsers(program._id)}
                                  className="mt-2 text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700"
                                >
                                  Try Again
                                </button>
                              </div>
                            ) : enrolledUsers[program._id]?.length === 0 ? (
                              <div className="text-center py-4">
                                <User className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">No users enrolled yet</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  {enrolledUsers[program._id]?.length}{" "}
                                  {enrolledUsers[program._id]?.length === 1 ? "User" : "Users"} Enrolled
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {enrolledUsers[program._id]?.map((user) => (
                                    <div
                                      key={user._id}
                                      className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#2a2a42] border border-gray-100 dark:border-gray-800"
                                    >
                                      <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                                        <AvatarImage
                                          src={user.profilePicture || "/placeholder.svg"}
                                          alt={`${user.firstName} ${user.lastName}`}
                                        />
                                        <AvatarFallback className="bg-[#00A8FF]/10 text-[#00A8FF] text-xs">
                                          {getInitials(user.firstName, user.lastName)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="overflow-hidden">
                                        <p className="text-sm font-medium truncate">
                                          {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                          {user.email}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#2a2a42] text-gray-900 dark:text-white w-full max-w-4xl rounded-xl shadow-xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between bg-gray-50 dark:bg-[#1f1f3a] px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {editingProgram ? (
                  <>
                    <Pencil className="w-5 h-5 text-[#00A8FF]" />
                    Edit Program
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-[#00A8FF]" />
                    Create New Program
                  </>
                )}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <ProgramForm
                selected={editingProgram}
                onClose={() => setShowForm(false)}
                onSave={handleSave}
                isSubmitting={isSubmitting}
              />
            </div>
          </motion.div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#2a2a42] p-6 rounded-xl shadow-xl text-gray-900 dark:text-white text-center max-w-sm w-full"
          >
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Delete Program</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this program? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
              >
                Delete Program
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}