"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Users, Edit, Trash2 } from "lucide-react"
import useStore from "../store/store"

const ProgramsPage = () => {
  const { programs, deleteProgram } = useStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.goal.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Programs</h1>
        <Link
          to="/programs/new"
          className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
        >
          <Plus size={18} />
          <span>Create Program</span>
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary/40" />
        </div>
        <input
          type="text"
          placeholder="Search programs..."
          className="pl-10 pr-4 py-2 w-full border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-primary text-lg">{program.name}</h3>
                  <p className="text-sm text-primary/70 mt-1">{program.goal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-primary/60">
                    <Users className="h-3 w-3" />
                    12 clients
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-primary/60 mb-2">Workouts</h4>
                  <ul className="space-y-1">
                    {program.workouts.map((workout, index) => (
                      <li key={index} className="text-sm text-primary">
                        {workout}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-primary/60 mb-2">Meals</h4>
                  <ul className="space-y-1">
                    {program.meals.map((meal, index) => (
                      <li key={index} className="text-sm text-primary">
                        {meal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-primary/60 mb-2">Meditations</h4>
                  <ul className="space-y-1">
                    {program.meditations.map((meditation, index) => (
                      <li key={index} className="text-sm text-primary">
                        {meditation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-secondary flex justify-end items-center gap-2">
                <Link
                  to={`/programs/${program.id}`}
                  className="p-1 text-primary/70 hover:text-secondary transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  className="p-1 text-primary/70 hover:text-red-500 transition-colors"
                  onClick={() => deleteProgram(program.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgramsPage

