"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Leaf, Wheat, FlameIcon as Fire, Scale } from "lucide-react"

const SnackPage = () => {
  const [snacks, setSnacks] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:8000/api/snacks")

        if (!response.ok) {
          throw new Error(`Failed to fetch snacks: ${response.status}`)
        }

        const data = await response.json()
        setSnacks(data)
      } catch (err) {
        console.error("Error fetching snacks:", err)
        setError("Failed to load snacks. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSnacks()
  }, [])

  const filteredSnacks = (() => {
    switch (filter) {
      case "vegetarian":
        return snacks.filter((snack) => snack.isVegetarian)
      case "vegan":
        return snacks.filter((snack) => snack.isVegan)
      case "glutenFree":
        return snacks.filter((snack) => snack.isGlutenFree)
      default:
        return snacks
    }
  })()

  const getDietaryIcon = (type) => {
    switch (type) {
      case "vegetarian":
        return <Leaf className="h-4 w-4 text-green-500" />
      case "vegan":
        return <Leaf className="h-4 w-4 text-green-600" />
      case "glutenFree":
        return <Wheat className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] rounded-lg p-6 mb-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Snack Ideas</h1>
          <p className="mt-2">Explore tasty and healthy snacks to fuel your body</p>
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-nowrap space-x-2 pb-2 md:flex-wrap md:justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${
                filter === "all"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              All Snacks
            </button>
            <button
              onClick={() => setFilter("vegetarian")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 flex items-center ${
                filter === "vegetarian"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              <Leaf className="h-4 w-4 mr-1" /> Vegetarian
            </button>
            <button
              onClick={() => setFilter("vegan")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 flex items-center ${
                filter === "vegan"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              <Leaf className="h-4 w-4 mr-1" /> Vegan
            </button>
            <button
              onClick={() => setFilter("glutenFree")}
              className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 flex items-center ${
                filter === "glutenFree"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white shadow-md"
                  : "bg-white text-[#0E0E2C] border border-[#ECECEE] hover:bg-gray-100"
              }`}
            >
              <Wheat className="h-4 w-4 mr-1" /> Gluten-Free
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnacks.map((snack) => (
              <Link
                to={`/snack/${snack._id}`}
                key={snack._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#ECECEE]"
              >
                <div className="relative">
                  <div className="w-full h-48 relative">
                    <img
                      src={snack.thumbnail || "/placeholder.svg"}
                      alt={snack.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {snack.isVegetarian && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Leaf className="h-3 w-3 mr-1" /> Vegetarian
                      </span>
                    )}
                    {snack.isVegan && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Leaf className="h-3 w-3 mr-1" /> Vegan
                      </span>
                    )}
                    {snack.isGlutenFree && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Wheat className="h-3 w-3 mr-1" /> GF
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#0E0E2C] mb-3">{snack.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{snack.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-[#0E0E2C]">
                      <Fire className="h-4 w-4 mr-1 text-[#00A8FF]" />
                      <span className="text-sm">{snack.calories} kcal</span>
                    </div>
                    <div className="flex items-center text-[#0E0E2C]">
                      <Scale className="h-4 w-4 mr-1 text-[#00A8FF]" />
                      <span className="text-sm">{snack.protein}g protein</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden">
                      <img
                        src={snack.trainer?.profilePicture || "/placeholder.svg"}
                        alt={snack.trainerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{snack.trainerName}</p>
                      <p className="text-xs text-gray-500">{snack.trainer?.specialization || "Nutrition Specialist"}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium">
                    View Recipe
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && !error && filteredSnacks.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-[#ECECEE]">
            <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">No snacks found</h3>
            <p className="text-gray-600">Try selecting a different dietary preference</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SnackPage
