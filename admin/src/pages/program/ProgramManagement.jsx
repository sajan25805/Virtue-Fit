

"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProgramForm from "./ProgramForm"
import { useProgramStore } from "../../store/program-store"
import { Plus, Trash2, Pencil, Loader2, Calendar, Users, Target, Search } from "lucide-react"

const ProgramManagement = () => {
  const { programs, fetchPrograms, createProgram, updateProgram, deleteProgram, loading } = useProgramStore()
  const [searchTerm, setSearchTerm] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const handleSave = async (data) => {
    const res = editingProgram ? await updateProgram(editingProgram._id, data) : await createProgram(data)

    if (res.success) {
      toast.success(`Program ${editingProgram ? "updated" : "created"}!`)
      setShowForm(false)
      setEditingProgram(null)
    } else {
      toast.error(res.message || "Something went wrong")
    }
  }

  const handleDelete = async () => {
    const res = await deleteProgram(confirmDeleteId)
    if (res.success) toast.success("Program deleted")
    else toast.error(res.message || "Deletion failed")
    setConfirmDeleteId(null)
  }

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.goal.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen p-6 bg-white text-[#0E0E2C]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Program Management</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF] outline-none w-full sm:w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <button
              onClick={() => {
                setShowForm(true)
                setEditingProgram(null)
              }}
              className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-md flex items-center justify-center gap-2 text-white"
            >
              <Plus className="w-4 h-4" />
              Add Program
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            {searchTerm ? (
              <>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No matching programs</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  No programs found matching "{searchTerm}". Try a different search term or create a new program.
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#00A8FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#00A8FF]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Programs Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Create your first fitness program to help clients achieve their goals with structured workout and
                  nutrition plans.
                </p>
              </>
            )}
            <button
              onClick={() => {
                setShowForm(true)
                setEditingProgram(null)
              }}
              className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create Your First Program
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-[#0E0E2C] mb-2">{program.name}</h3>
                    <span className="bg-[#00A8FF]/10 text-[#00A8FF] text-xs px-2 py-1 rounded-full">
                      {program.days.length} {program.days.length === 1 ? "Day" : "Days"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-[#00A8FF]" />
                    <p className="text-sm text-gray-600">{program.goal}</p>
                  </div>

                  <div className="space-y-2">
                    {program.days.slice(0, 3).map((day, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded p-2 text-xs flex items-center justify-between border border-gray-100"
                      >
                        <span className="font-medium text-[#0E0E2C]">Day {idx + 1}</span>
                        <div className="flex gap-1">
                          {day.workout && (
                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">Workout</span>
                          )}
                          {day.meal && (
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">Meal</span>
                          )}
                          {day.snack && (
                            <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
                              Snack
                            </span>
                          )}
                          {day.meditation && (
                            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                              Meditation
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    {program.days.length > 3 && (
                      <div className="text-center text-xs text-gray-500">+{program.days.length - 3} more days</div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    <span>0 Clients</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProgram(program)
                        setShowForm(true)
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-50 text-[#00A8FF] hover:bg-blue-100"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(program._id)}
                      className="h-8 w-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Program Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-[#0E0E2C] w-full max-w-3xl p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <ProgramForm selected={editingProgram} onClose={() => setShowForm(false)} onSave={handleSave} />
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-[#0E0E2C] text-center max-w-sm w-full">
            <div className="w-12 h-12 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this program?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramManagement
