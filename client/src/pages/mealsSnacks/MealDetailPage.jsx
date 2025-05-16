"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  ArrowLeft,
  FlameIcon as Fire,
  Scale,
  Leaf,
  Wheat,
  Clock,
  User,
  Heart,
  Share2,
  Printer,
  Timer,
  Utensils,
  CheckCircle,
  Calendar,
  Info,
  X,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  MessageSquare,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

const MealDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("ingredients")
  const [servings, setServings] = useState(1)
  const [liked, setLiked] = useState(false)
  const [showNutritionModal, setShowNutritionModal] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showPrintView, setShowPrintView] = useState(false)
  const printRef = useRef(null)
  const [activeSection, setActiveSection] = useState("overview")
  // Add a new state for similar meals
  const [similarMeals, setSimilarMeals] = useState([])

  // Modify the useEffect to fetch similar meals as well
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/meals/${id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch meal details: ${response.status}`)
        }

        const data = await response.json()
        setMeal(data)
      } catch (err) {
        console.error("Error fetching meal details:", err)
        setError("Failed to load meal details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    const fetchSimilarMeals = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/meals`)
        if (!response.ok) {
          throw new Error(`Failed to fetch similar meals: ${response.status}`)
        }

        const data = await response.json()
        // Filter out the current meal and limit to 3 meals
        const filtered = data.filter((meal) => meal._id !== id).slice(0, 3)
        setSimilarMeals(filtered)
      } catch (err) {
        console.error("Error fetching similar meals:", err)
      }
    }

    if (id) {
      fetchMealDetails()
      fetchSimilarMeals()
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
    if (!meal) return null

    return (
      <div className="flex flex-wrap gap-2">
        {meal.isVegetarian && (
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Leaf className="h-3 w-3 mr-1" /> Vegetarian
          </span>
        )}
        {meal.isVegan && (
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Leaf className="h-3 w-3 mr-1" /> Vegan
          </span>
        )}
        {meal.isGlutenFree && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Wheat className="h-3 w-3 mr-1" /> Gluten-Free
          </span>
        )}
      </div>
    )
  }

  const handlePrint = () => {
    setShowPrintView(true)
    setTimeout(() => {
      window.print()
      setShowPrintView(false)
    }, 300)
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = meal?.title || "Check out this meal"

    let shareUrl
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this meal: ${url}`)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard!")
        setShowShareOptions(false)
        return
    }

    window.open(shareUrl, "_blank")
    setShowShareOptions(false)
  }

  const addToShoppingList = () => {
    toast.success("Ingredients added to shopping list!")
  }

  const addToMealPlan = () => {
    toast.success("Meal added to your meal plan!")
  }

  const calculateNutrition = (value) => {
    return Math.round(value * servings)
  }

  const parseIngredients = () => {
    if (!meal?.ingredients) return []

    let ingredientsText = ""
    if (typeof meal.ingredients === "string") {
      ingredientsText = meal.ingredients
    } else if (Array.isArray(meal.ingredients)) {
      ingredientsText = meal.ingredients.join("\n")
    }

    // Extract ingredients list, skipping the title
    const lines = ingredientsText.split("\n").filter((line) => line.trim() && !line.startsWith("#"))

    // Process each line to extract ingredients
    return lines
      .map((line) => {
        // Remove bullet points and clean up
        return line.replace(/^-\s*/, "").trim()
      })
      .filter((ingredient) => ingredient)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
      </div>
    )
  }

  if (error || !meal) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error || "Meal not found"}</span>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center text-[#0E0E2C] hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to meals
        </button>
      </div>
    )
  }

  // Calculate macronutrient percentages
  const totalMacros = meal.protein + meal.carbs + meal.fats
  const proteinPercentage = Math.round((meal.protein / totalMacros) * 100)
  const carbsPercentage = Math.round((meal.carbs / totalMacros) * 100)
  const fatsPercentage = Math.round((meal.fats / totalMacros) * 100)

  // Parse ingredients for display
  const ingredients = parseIngredients()

  return (
    <>
      {/* Regular View */}
      {!showPrintView && (
        <div className="bg-white min-h-screen">
          {/* Hero Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
            <div
              className="h-64 md:h-96 bg-cover bg-center"
              style={{ backgroundImage: `url(${meal.thumbnail})` }}
            ></div>

            <div className="container mx-auto px-4 relative z-20 -mt-40">
              <Link
                to="/meals"
                className="inline-flex items-center text-white hover:text-[#00A8FF] mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Meals
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">{renderDietaryTags()}</div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 text-[#0E0E2C]">{meal.title}</h1>
                    <p className="text-gray-600 mb-4">{meal.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLiked(!liked)}
                          className={`p-2 rounded-full hover:bg-gray-100 ${liked ? "text-red-500" : "text-gray-400"}`}
                        >
                          <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => setShowShareOptions(!showShareOptions)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>

                          {showShareOptions && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                              <div className="py-1">
                                <button
                                  onClick={() => handleShare("facebook")}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Share on Facebook
                                </button>
                                <button
                                  onClick={() => handleShare("twitter")}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Share on Twitter
                                </button>
                                <button
                                  onClick={() => handleShare("whatsapp")}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Share on WhatsApp
                                </button>
                                <button
                                  onClick={() => handleShare("copy")}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Copy Link
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={handlePrint}
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
                          aria-label="Print recipe"
                        >
                          <Printer className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                        <Fire className="h-6 w-6 text-[#00A8FF] mb-2" />
                        <span className="text-sm text-gray-500">Calories</span>
                        <span className="font-semibold">{calculateNutrition(meal.calories)} kcal</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                        <Scale className="h-6 w-6 text-[#00A8FF] mb-2" />
                        <span className="text-sm text-gray-500">Protein</span>
                        <span className="font-semibold">{calculateNutrition(meal.protein)}g</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                        <Scale className="h-6 w-6 text-[#00A8FF] mb-2" />
                        <span className="text-sm text-gray-500">Carbs</span>
                        <span className="font-semibold">{calculateNutrition(meal.carbs)}g</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-[#F7F7FD] rounded-lg">
                        <Scale className="h-6 w-6 text-[#00A8FF] mb-2" />
                        <span className="text-sm text-gray-500">Fats</span>
                        <span className="font-semibold">{calculateNutrition(meal.fats)}g</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => setShowNutritionModal(true)}
                        className="text-[#00A8FF] hover:underline text-sm font-medium flex items-center"
                      >
                        <Info className="w-4 h-4 mr-1" /> View Full Nutrition Info
                      </button>
                    </div>
                  </div>

                  <div className="md:w-1/3 flex flex-col">
                    <div className="bg-[#F7F7FD] p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Servings</h3>
                        <div className="flex items-center">
                          <button
                            onClick={() => setServings(Math.max(1, servings - 1))}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200"
                            disabled={servings <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="mx-3 font-medium">{servings}</span>
                          <button
                            onClick={() => setServings(servings + 1)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Timer className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Prep Time</p>
                          <p className="font-medium">15 mins</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Utensils className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Cook Time</p>
                          <p className="font-medium">25 mins</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Time</p>
                          <p className="font-medium">40 mins</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={addToMealPlan}
                        className="w-full bg-[#00A8FF] hover:bg-[#0096E6] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" /> Add to Meal Plan
                      </button>
                      <button
                        onClick={addToShoppingList}
                        className="w-full border border-[#00A8FF] text-[#00A8FF] hover:bg-[#F7F7FD] py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" /> Add to Shopping List
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="container mx-auto px-4 mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveSection("overview")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "overview"
                      ? "border-[#00A8FF] text-[#00A8FF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveSection("ingredients")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "ingredients"
                      ? "border-[#00A8FF] text-[#00A8FF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveSection("instructions")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "instructions"
                      ? "border-[#00A8FF] text-[#00A8FF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Instructions
                </button>
                <button
                  onClick={() => setActiveSection("nutrition")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "nutrition"
                      ? "border-[#00A8FF] text-[#00A8FF]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Nutrition
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Overview Section */}
              {activeSection === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-3 gap-8"
                >
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-4">About This Meal</h2>
                    <p className="text-gray-600 mb-6">{meal.description}</p>

                    <div className="bg-[#F7F7FD] p-6 rounded-lg mb-6">
                      <h3 className="font-semibold mb-4">Health Benefits</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-600">High in protein to support muscle growth and recovery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-600">
                            Quinoa provides complex carbohydrates for sustained energy
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-600">
                            Gluten-free and suitable for those with gluten sensitivities
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-600">Rich in vitamins and minerals from fresh vegetables</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="font-semibold mb-3">Perfect For</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Post-Workout</span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Lunch</span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Dinner</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Meal Prep</span>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold mb-3">Tips & Notes</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Info className="w-3 h-3 text-blue-600" />
                          </div>
                          <span>For meal prep, store the chicken and quinoa separately for best results.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Info className="w-3 h-3 text-blue-600" />
                          </div>
                          <span>Add a squeeze of fresh lemon just before serving for extra brightness.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Info className="w-3 h-3 text-blue-600" />
                          </div>
                          <span>This meal will keep in the refrigerator for up to 3 days.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                      <h2 className="text-xl font-bold text-[#0E0E2C] mb-4">Created By</h2>
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
                          <img
                            src={meal.trainer?.profilePicture || "/placeholder.svg"}
                            alt={meal.trainerName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-[#0E0E2C]">{meal.trainerName}</h3>
                        <span className="bg-[#F7F7FD] text-[#00A8FF] text-xs font-bold px-2 py-1 rounded-full mb-3">
                          {meal.trainer?.specialization || "Nutrition Specialist"}
                        </span>

                        {meal.trainer?.bio && (
                          <p className="text-sm text-gray-600 text-center mb-4">{meal.trainer.bio}</p>
                        )}

                        <div className="w-full space-y-2 mt-2">
                          {meal.trainer?.email && (
                            <div className="flex items-center text-gray-700">
                              <User className="h-4 w-4 mr-2 text-[#00A8FF]" />
                              <span className="text-sm">{meal.trainer.email}</span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-700">
                            <Calendar className="h-4 w-4 mr-2 text-[#00A8FF]" />
                            <span className="text-sm">Added on {formatDate(meal.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F7F7FD] p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Rate This Recipe</h3>
                      <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} className="text-yellow-400 focus:outline-none">
                            <Star className="w-8 h-8" />
                          </button>
                        ))}
                      </div>
                      <button className="w-full bg-[#00A8FF] hover:bg-[#0096E6] text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Write a Review
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Ingredients Section */}
              {activeSection === "ingredients" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Ingredients</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Servings:</span>
                        <button
                          onClick={() => setServings(Math.max(1, servings - 1))}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                          disabled={servings <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="mx-3 font-medium">{servings}</span>
                        <button
                          onClick={() => setServings(servings + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={addToShoppingList}
                        className="text-[#00A8FF] hover:underline text-sm font-medium flex items-center"
                      >
                        <ShoppingBag className="w-4 h-4 mr-1" /> Add to Shopping List
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#00A8FF]/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[#00A8FF]" />
                        </div>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold mb-4">Equipment Needed</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[#00A8FF]/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Utensils className="w-4 h-4 text-[#00A8FF]" />
                        </div>
                        <span className="text-gray-700">Grill pan or outdoor grill</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[#00A8FF]/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Utensils className="w-4 h-4 text-[#00A8FF]" />
                        </div>
                        <span className="text-gray-700">Medium pot with lid</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[#00A8FF]/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Utensils className="w-4 h-4 text-[#00A8FF]" />
                        </div>
                        <span className="text-gray-700">Cutting board and knife</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[#00A8FF]/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Utensils className="w-4 h-4 text-[#00A8FF]" />
                        </div>
                        <span className="text-gray-700">Mixing bowl</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Instructions Section */}
              {activeSection === "instructions" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Cooking Instructions</h2>
                    <button
                      onClick={handlePrint}
                      className="text-[#00A8FF] hover:underline text-sm font-medium flex items-center"
                    >
                      <Printer className="w-4 h-4 mr-1" /> Print Recipe
                    </button>
                  </div>

                  <div className="prose prose-blue max-w-none">
                    <ReactMarkdown>
                      {typeof meal.recipes === "string"
                        ? meal.recipes
                        : Array.isArray(meal.recipes)
                          ? meal.recipes.join("\n")
                          : ""}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold mb-4">Chef's Note</h3>
                    <div className="bg-[#F7F7FD] p-4 rounded-lg">
                      <p className="text-gray-700">
                        For best results, let the chicken rest for 5 minutes after cooking before slicing to keep it
                        juicy and tender.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Nutrition Section */}
              {activeSection === "nutrition" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold mb-6">Nutritional Information</h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Calories</span>
                          <span className="font-bold">{calculateNutrition(meal.calories)} kcal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-[#00A8FF] h-2.5 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-4">Macronutrients</h3>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700">Protein</span>
                            <div className="flex items-center">
                              <span className="font-medium">{calculateNutrition(meal.protein)}g</span>
                              <span className="text-xs text-gray-500 ml-1">({proteinPercentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-500 h-2.5 rounded-full"
                              style={{ width: `${proteinPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700">Carbs</span>
                            <div className="flex items-center">
                              <span className="font-medium">{calculateNutrition(meal.carbs)}g</span>
                              <span className="text-xs text-gray-500 ml-1">({carbsPercentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-yellow-500 h-2.5 rounded-full"
                              style={{ width: `${carbsPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700">Fats</span>
                            <div className="flex items-center">
                              <span className="font-medium">{calculateNutrition(meal.fats)}g</span>
                              <span className="text-xs text-gray-500 ml-1">({fatsPercentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-red-500 h-2.5 rounded-full"
                              style={{ width: `${fatsPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Dietary Information</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Vegetarian</p>
                          <p className="font-medium">{meal.isVegetarian ? "Yes" : "No"}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Vegan</p>
                          <p className="font-medium">{meal.isVegan ? "Yes" : "No"}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Gluten-Free</p>
                          <p className="font-medium">{meal.isGlutenFree ? "Yes" : "No"}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Dairy-Free</p>
                          <p className="font-medium">Yes</p>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-4">Estimated Micronutrients</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Vitamin A</span>
                          <span className="text-sm font-medium">15% DV</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Vitamin C</span>
                          <span className="text-sm font-medium">20% DV</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Calcium</span>
                          <span className="text-sm font-medium">8% DV</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Iron</span>
                          <span className="text-sm font-medium">15% DV</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Potassium</span>
                          <span className="text-sm font-medium">12% DV</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-4">
                        *Percent Daily Values (DV) are based on a 2,000 calorie diet. Your daily values may be higher or
                        lower depending on your calorie needs.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Similar Meals Section */}
          <div className="bg-[#F7F7FD] py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarMeals.length > 0 ? (
                  similarMeals.map((similarMeal) => (
                    <div key={similarMeal._id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={similarMeal.thumbnail || "/placeholder.svg?height=200&width=400"}
                          alt={similarMeal.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex gap-2 mb-2">
                          {similarMeal.isVegetarian && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              Vegetarian
                            </span>
                          )}
                          {similarMeal.isVegan && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Vegan</span>
                          )}
                          {similarMeal.isGlutenFree && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                              Gluten-Free
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold mb-1">{similarMeal.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Fire className="h-3 w-3 mr-1" />
                          <span>{similarMeal.calories} kcal</span>
                        </div>
                        <Link to={`/meals/${similarMeal._id}`}>
                          <button className="w-full mt-2 bg-[#00A8FF] hover:bg-[#0096E6] text-white py-2 rounded text-sm transition-colors">
                            View Recipe
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">No similar meals found at the moment.</p>
                    <Link to="/meals" className="text-[#00A8FF] hover:underline mt-2 inline-block">
                      Browse all meals
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Nutrition Modal */}
          <AnimatePresence>
            {showNutritionModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg max-w-md w-full p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Nutrition Facts</h3>
                    <button onClick={() => setShowNutritionModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="border-t border-b border-gray-200 py-2 mb-4">
                    <p className="text-sm text-gray-500">Serving size: 1 meal ({servings} servings)</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center font-bold">
                        <span>Calories</span>
                        <span>{calculateNutrition(meal.calories)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center font-bold mb-2">
                        <span>Total Fat</span>
                        <span>{calculateNutrition(meal.fats)}g</span>
                      </div>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>Saturated Fat</span>
                          <span>3g</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Trans Fat</span>
                          <span>0g</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center font-bold mb-2">
                        <span>Cholesterol</span>
                        <span>65mg</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center font-bold mb-2">
                        <span>Sodium</span>
                        <span>320mg</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center font-bold mb-2">
                        <span>Total Carbohydrate</span>
                        <span>{calculateNutrition(meal.carbs)}g</span>
                      </div>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>Dietary Fiber</span>
                          <span>4g</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Total Sugars</span>
                          <span>2g</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center font-bold mb-2">
                        <span>Protein</span>
                        <span>{calculateNutrition(meal.protein)}g</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 text-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span>Vitamin D</span>
                        <span>0mcg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Calcium</span>
                        <span>80mg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Iron</span>
                        <span>2.7mg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Potassium</span>
                        <span>420mg</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily
                    diet. 2,000 calories a day is used for general nutrition advice.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Print View */}
      {showPrintView && (
        <div ref={printRef} className="bg-white p-8 print:block hidden">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{meal.title}</h1>
            <p className="text-gray-600 mb-6">{meal.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">{renderDietaryTags()}</div>

            <div className="grid grid-cols-4 gap-4 mb-6 text-center">
              <div className="border p-3 rounded">
                <p className="font-bold">{meal.calories} kcal</p>
                <p className="text-sm text-gray-500">Calories</p>
              </div>
              <div className="border p-3 rounded">
                <p className="font-bold">{meal.protein}g</p>
                <p className="text-sm text-gray-500">Protein</p>
              </div>
              <div className="border p-3 rounded">
                <p className="font-bold">{meal.carbs}g</p>
                <p className="text-sm text-gray-500">Carbs</p>
              </div>
              <div className="border p-3 rounded">
                <p className="font-bold">{meal.fats}g</p>
                <p className="text-sm text-gray-500">Fats</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Ingredients</h2>
              <ul className="list-disc pl-6 space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Instructions</h2>
              <div className="prose max-w-none">
                <ReactMarkdown>
                  {typeof meal.recipes === "string"
                    ? meal.recipes
                    : Array.isArray(meal.recipes)
                      ? meal.recipes.join("\n")
                      : ""}
                </ReactMarkdown>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t text-sm text-gray-500">
              <p>Recipe by: {meal.trainerName}</p>
              <p>Source: Virtue Fit</p>
              <p>Printed on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MealDetailPage
