"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Play, Pause, Edit, Trash2 } from "lucide-react"
import useStore from "../store/store"

const MeditationsPage = () => {
  const { meditations, deleteMeditation } = useStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [playingId, setPlayingId] = useState(null)

  const filteredMeditations = meditations.filter(
    (meditation) =>
      meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Meditations</h1>
        <Link
          to="/meditations/new"
          className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
        >
          <Plus size={18} />
          <span>Add Meditation</span>
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary/40" />
        </div>
        <input
          type="text"
          placeholder="Search meditations..."
          className="pl-10 pr-4 py-2 w-full border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeditations.map((meditation) => (
          <div key={meditation.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-primary">{meditation.title}</h3>
                  <p className="text-sm text-primary/70 mt-1">{meditation.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 bg-neutral rounded-full text-primary hover:bg-secondary hover:text-white transition-colors"
                    onClick={() => togglePlay(meditation.id)}
                  >
                    {playingId === meditation.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  {meditation.category}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{meditation.level}</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {meditation.duration}
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-secondary flex justify-between items-center">
                <div className="text-xs text-primary/60">Audio: {meditation.audioUrl.split("/").pop()}</div>
                <div className="flex gap-2">
                  <Link
                    to={`/meditations/${meditation.id}`}
                    className="p-1 text-primary/70 hover:text-secondary transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    className="p-1 text-primary/70 hover:text-red-500 transition-colors"
                    onClick={() => deleteMeditation(meditation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeditationsPage

