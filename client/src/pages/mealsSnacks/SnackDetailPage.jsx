"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, FlameIcon as Fire, Scale, Leaf, Wheat, Clock, User, ChefHat, BookOpen } from "lucide-react"
import ReactMarkdown from "react-markdown"

const SnackDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [snack, setSnack] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("ingredients")

  useEffect(() => {
    const fetchSnackDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/snacks/${id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch snack details: ${response.status}`)
        }

        const data = await response.json()
        setSnack(data)
      } catch (err) {
        console.error("Error fetching snack details:", err)
        setError("Failed to load snack details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchSnackDetails()
    }
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderDietaryTags = () => {
    if (!snack) return null

    return (
      <div className="flex flex-wrap gap-2">
        {snack.isVegetarian && (
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Leaf className="h-3 w-3 mr-1" /> Vegetarian
          </span>
        )}
        {snack.isVegan && (
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Leaf className="h-3 w-3 mr-1" /> Vegan
          </span>
        )}
        {snack.isGlutenFree && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Wheat className="h-3 w-3 mr-1" /> Gluten-Free
          </span>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F7F7FD]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
      </div>
    )
  }

  if (error || !snack) {
    return (
      <div className="container mx-auto px-4 py-8 bg-[#F7F7FD] min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error || "Snack not found"}</span>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center text-[#0E0E2C] hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to snacks
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#F7F7FD] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/snacks" className="flex items-center text-[#0E0E2C] hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to snacks
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img src={snack.thumbnail || "/placeholder.svg"} alt={snack.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex flex-wrap gap-2 mb-2">{renderDietaryTags()}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{snack.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0E0E2C] mb-4">Snack Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Fire className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Calories</span>
                  <span className="font-semibold">{snack.calories} kcal</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Scale className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Protein</span>
                  <span className="font-semibold">{snack.protein}g</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Scale className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Carbs</span>
                  <span className="font-semibold">{snack.carbs}g</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                  <Scale className="h-6 w-6 text-[#00A8FF] mb-2" />
                  <span className="text-sm text-gray-500">Fats</span>
                  <span className="font-semibold">{snack.fats}g</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#0E0E2C] mb-2">Description</h3>
              <p className="text-gray-700 mb-6">{snack.description}</p>

              <div className="mt-6">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                      activeTab === "ingredients"
                        ? "border-b-2 border-[#00A8FF] text-[#00A8FF]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("ingredients")}
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ingredients
                    </div>
                  </button>
                  <button
                    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                      activeTab === "recipe"
                        ? "border-b-2 border-[#00A8FF] text-[#00A8FF]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("recipe")}
                  >
                    <div className="flex items-center">
                      <ChefHat className="h-4 w-4 mr-2" />
                      Recipe Steps
                    </div>
                  </button>
                </div>

                <div className="py-4">
                  {activeTab === "ingredients" && (
                    <div>
                      <h4 className="text-lg font-medium mb-3">Ingredients</h4>
                      <div className="text-gray-700">
                        <ReactMarkdown>
                          {typeof snack.ingredients === "string"
                            ? snack.ingredients
                            : Array.isArray(snack.ingredients)
                              ? snack.ingredients.join("\n")
                              : ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}

                  {activeTab === "recipe" && (
                    <div>
                      <h4 className="text-lg font-medium mb-3">Preparation Steps</h4>
                      <div className="text-gray-700">
                        <ReactMarkdown>
                          {typeof snack.recipes === "string"
                            ? snack.recipes
                            : Array.isArray(snack.recipes)
                              ? snack.recipes.join("\n")
                              : ""}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Created By</h2>
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={snack.trainer?.profilePicture || "/placeholder.svg"}
                    alt={snack.trainerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#0E0E2C]">{snack.trainerName}</h3>
                <span className="bg-[#F7F7FD] text-[#00A8FF] text-xs font-bold px-2 py-1 rounded-full mb-4">
                  {snack.trainer?.specialization || "Nutrition Specialist"}
                </span>

                <div className="w-full space-y-3 mt-2">
                  {snack.trainer?.email && (
                    <div className="flex items-center text-gray-700">
                      <User className="h-4 w-4 mr-2 text-[#00A8FF]" />
                      <span className="text-sm">{snack.trainer.email}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-[#00A8FF]" />
                    <span className="text-sm">Added on {formatDate(snack.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Nutritional Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Calories</span>
                  <span className="font-medium">{snack.calories} kcal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#00A8FF] h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Protein</span>
                  <span className="font-medium">{snack.protein}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${(snack.protein / (snack.protein + snack.carbs + snack.fats)) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Carbs</span>
                  <span className="font-medium">{snack.carbs}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: `${(snack.carbs / (snack.protein + snack.carbs + snack.fats)) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Fats</span>
                  <span className="font-medium">{snack.fats}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: `${(snack.fats / (snack.protein + snack.carbs + snack.fats)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SnackDetailPage
