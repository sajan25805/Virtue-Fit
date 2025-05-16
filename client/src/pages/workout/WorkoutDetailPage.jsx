"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import {
  CheckCircle,
  Star,
  Pencil,
  Trash,
  Play,
  Pause,
  Clock,
  Calendar,
  ArrowLeft,
  Award,
  Heart,
  Share2,
  Flame,
  Dumbbell,
  Target,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ThumbsUp,
  X,
  Info,
} from "lucide-react"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const WorkoutDetailPage = () => {
  const { id } = useParams()
  const videoRef = useRef(null)
  const reviewFormRef = useRef(null)

  const [workout, setWorkout] = useState(null)
  const [progressData, setProgressData] = useState(null)
  const [videoProgress, setVideoProgress] = useState(0)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 })
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [ratingFilter, setRatingFilter] = useState("all")
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [expandedSections, setExpandedSections] = useState({})
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showInfoModal, setShowInfoModal] = useState(false)

  const userId = localStorage.getItem("userId")?.trim()

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/workouts/${id}`)
        const data = await res.json()
        setWorkout(data)

        // Initialize expanded sections
        if (data && data.sections) {
          const initialExpanded = {}
          data.sections.forEach((section, index) => {
            initialExpanded[index] = index === 0 // Only expand first section by default
          })
          setExpandedSections(initialExpanded)
        }
      } catch (error) {
        console.error("Error fetching workout:", error)
        toast.error("Failed to load workout details")
      }
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/workout-progress/user`, { credentials: "include" })
        const data = await res.json()
        if (data.success && data.progress) {
          const match = data.progress.find((p) => p.workout._id === id)
          if (match) setProgressData(match)
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/workouts/${id}/reviews`, { credentials: "include" })
        const data = await res.json()
        if (data.success) setReviews(data.reviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }

    fetchWorkout()
    fetchProgress()
    fetchReviews()
  }, [id])

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current

      const handleLoadedMetadata = () => {
        setDuration(video.duration)
      }

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime)
        setVideoProgress((video.currentTime / video.duration) * 100)
      }

      const handlePlay = () => {
        setIsPlaying(true)
        handleStartWorkout()
      }

      const handlePause = () => {
        setIsPlaying(false)
      }

      const handleEnded = () => {
        setIsPlaying(false)
        setVideoProgress(100)
      }

      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      video.addEventListener("timeupdate", handleTimeUpdate)
      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)
      video.addEventListener("ended", handleEnded)

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        video.removeEventListener("timeupdate", handleTimeUpdate)
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
        video.removeEventListener("ended", handleEnded)
      }
    }
  }, [videoRef])

  const handleStartWorkout = async () => {
    if (!progressData) {
      try {
        const res = await fetch("http://localhost:8000/api/workout-progress/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ workoutId: id }),
        })
        const data = await res.json()
        if (data.success) {
          setProgressData(data.progress)
          toast.success("Workout started! Your progress will be tracked.")
        }
      } catch (error) {
        console.error("Error starting workout:", error)
      }
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const handleMarkComplete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/workout-progress/complete/${progressData._id}`, {
        method: "PATCH",
        credentials: "include",
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Workout marked as complete! Great job! 💪")
        setProgressData({ ...progressData, isCompleted: true, completedAt: new Date().toISOString() })

        // Show review modal after a short delay
        setTimeout(() => {
          setShowReviewModal(true)
        }, 1500)
      }
    } catch (error) {
      console.error("Error marking workout complete:", error)
      toast.error("Failed to mark workout as complete")
    }
  }

  const submitReview = async () => {
    if (!newReview.comment.trim()) {
      toast.error("Please add a comment to your review")
      return
    }

    if (newReview.rating === 0) {
      toast.error("Please select a rating")
      return
    }

    try {
      const url = editingReviewId
        ? `http://localhost:8000/api/workouts/${id}/review/${editingReviewId}`
        : `http://localhost:8000/api/workouts/${id}/review`
      const method = editingReviewId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newReview),
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`Review ${editingReviewId ? "updated" : "submitted"} successfully!`)
        setShowReviewModal(false)
        setEditingReviewId(null)
        setNewReview({ comment: "", rating: 0 })

        // Refresh reviews
        const fetchReviews = await fetch(`http://localhost:8000/api/workouts/${id}/reviews`, { credentials: "include" })
        const updated = await fetchReviews.json()
        if (updated.success) setReviews(updated.reviews)

        // Refresh workout to get updated rating
        const fetchWorkout = await fetch(`http://localhost:8000/api/workouts/${id}`)
        const updatedWorkout = await fetchWorkout.json()
        setWorkout(updatedWorkout)
      } else {
        toast.error(data.message || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review")
    }
  }

  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/workouts/${id}/review/${reviewId}`, {
          method: "DELETE",
          credentials: "include",
        })

        const data = await res.json()
        if (data.success) {
          toast.success("Review deleted successfully")
          setReviews((prev) => prev.filter((r) => r._id !== reviewId))

          // Refresh workout to get updated rating
          const fetchWorkout = await fetch(`http://localhost:8000/api/workouts/${id}`)
          const updatedWorkout = await fetchWorkout.json()
          setWorkout(updatedWorkout)
        } else {
          toast.error(data.message || "Failed to delete review")
        }
      } catch (error) {
        console.error("Error deleting review:", error)
        toast.error("Failed to delete review")
      }
    }
  }

  const toggleSectionExpand = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00"

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const shareWorkout = (platform) => {
    const url = window.location.href
    const title = workout?.title || "Check out this workout"

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
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this workout: ${url}`)}`
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

  const isUserReview = (r) => r?.user?._id?.toString() === userId

  const filteredReviews = reviews.filter((r) =>
    ratingFilter === "all" ? true : r.rating === Number.parseInt(ratingFilter),
  )

  const calculateRatingCounts = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach((review) => {
      if (counts[review.rating] !== undefined) {
        counts[review.rating]++
      }
    })
    return counts
  }

  const ratingCounts = calculateRatingCounts()

  if (!workout) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#00A8FF] rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="bg-white text-[#0E0E2C] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E2C]/80 to-transparent z-10"></div>
        <div className="h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${workout.thumbnail})` }}></div>

        <div className="container mx-auto px-4 relative z-20 -mt-40">
          <Link
            to="/workouts"
            className="inline-flex items-center text-white hover:text-[#00A8FF] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workouts
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {workout.difficulty}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {workout.duration} min
                  </span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Flame className="w-3 h-3 mr-1" /> {workout.calorie} cal
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2">{workout.title}</h1>
                <p className="text-gray-600 mb-4">{workout.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < Math.floor(workout.averageRating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{workout.averageRating || "0"}</span>
                    <span className="ml-1 text-sm text-gray-500">({workout.totalRatings || 0} ratings)</span>
                  </div>

                  <div className="flex items-center gap-3">
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
                              onClick={() => shareWorkout("facebook")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Share on Facebook
                            </button>
                            <button
                              onClick={() => shareWorkout("twitter")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Share on Twitter
                            </button>
                            <button
                              onClick={() => shareWorkout("whatsapp")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Share on WhatsApp
                            </button>
                            <button
                              onClick={() => shareWorkout("copy")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy Link
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Aim</p>
                      <p className="font-medium capitalize">{workout.aim || "General Fitness"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Difficulty</p>
                      <p className="font-medium">{workout.difficulty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-medium">{workout.calorie} cal</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium">{workout.duration} min</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col">
                <div className="bg-[#F7F7FD] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={workout.trainer?.profilePicture || "/placeholder.svg"}
                      alt={workout.trainer?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-semibold">{workout.trainer?.name}</p>
                      <p className="text-sm text-[#00A8FF]">{workout.trainer?.specialization}</p>
                    </div>
                  </div>

                  {progressData?.isCompleted ? (
                    <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Workout Completed</p>
                        <p className="text-xs">{formatDate(progressData.completedAt)}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleStartWorkout}
                      className="w-full bg-[#00A8FF] hover:bg-[#0096E6] text-white py-3 rounded-lg font-medium transition-colors mb-4 flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" /> Start Workout
                    </button>
                  )}

                  <div className="text-sm text-gray-600">
                    <p className="flex items-center gap-1 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Added on {formatDate(workout.createdAt)}
                    </p>
                    {workout.trainer?.isVerified && (
                      <p className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-green-500" />
                        Verified Trainer
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mt-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-[#00A8FF] text-[#00A8FF]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "video"
                  ? "border-[#00A8FF] text-[#00A8FF]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Video
            </button>
            <button
              onClick={() => setActiveTab("sections")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sections"
                  ? "border-[#00A8FF] text-[#00A8FF]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Workout Sections
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-[#00A8FF] text-[#00A8FF]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">About This Workout</h2>
                  <p className="text-gray-600 mb-6">{workout.description}</p>

                  <h3 className="font-semibold mb-3">What You'll Need</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">Comfortable workout clothes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">Water bottle</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">Exercise mat (optional)</span>
                    </li>
                  </ul>

                  <h3 className="font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600">Improves cardiovascular health</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600">Builds full-body strength</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600">Burns calories and promotes fat loss</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600">Increases energy levels</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Your Trainer</h2>
                  <div className="bg-[#F7F7FD] p-6 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={workout.trainer?.profilePicture || "/placeholder.svg"}
                        alt={workout.trainer?.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{workout.trainer?.name}</h3>
                        <p className="text-[#00A8FF]">{workout.trainer?.specialization}</p>
                      </div>
                    </div>

                    {workout.trainer?.bio && <p className="text-gray-600 mb-4">{workout.trainer.bio}</p>}

                    {workout.trainer?.isVerified && (
                      <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        <span>Verified Professional Trainer</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Workout Structure</h3>
                    <div className="space-y-3">
                      {workout.sections.map((section, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">{section.title}</p>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-4">What People Are Saying</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={review.user?.profilePicture || "/placeholder.svg"}
                          alt={`${review.user?.firstName} ${review.user?.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {review.user?.firstName} {review.user?.lastName}
                          </p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3" fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {reviews.length > 3 && (
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className="mt-4 text-[#00A8FF] hover:underline text-sm font-medium"
                  >
                    View all {reviews.length} reviews
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Video Tab */}
          {activeTab === "video" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="bg-[#F7F7FD] p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Workout Video</h2>

                <div className="relative rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    className="w-full rounded-lg"
                    poster={workout.thumbnail}
                    onClick={handlePlayPause}
                  >
                    <source src={workout.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <button
                        onClick={handlePlayPause}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </button>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-[#00A8FF] h-1.5 rounded-full" style={{ width: `${videoProgress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayPause}
                      className="bg-[#00A8FF] hover:bg-[#0096E6] text-white p-3 rounded-full transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <span className="text-sm font-medium">{isPlaying ? "Pause" : "Play"}</span>
                  </div>

                  {!progressData?.isCompleted && videoProgress >= 90 && (
                    <button
                      onClick={handleMarkComplete}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" /> Mark as Complete
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Tips for This Workout</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">
                        Start with a proper warm-up to prepare your muscles and joints.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">Focus on maintaining proper form throughout each exercise.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">Stay hydrated by drinking water between exercises.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-600">
                        If you need to, pause the video and take breaks when necessary.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Your Progress</h3>
                  {progressData ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Workout Progress</span>
                        <span className="text-sm text-gray-500">
                          {progressData.isCompleted ? "Completed" : "In Progress"}
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className={`h-2.5 rounded-full ${progressData.isCompleted ? "bg-green-600" : "bg-[#00A8FF]"}`}
                          style={{ width: `${progressData.isCompleted ? 100 : videoProgress}%` }}
                        ></div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p className="flex items-center gap-1 mb-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          Started: {formatDate(progressData.startedAt)}
                        </p>
                        {progressData.isCompleted && (
                          <p className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Completed: {formatDate(progressData.completedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 mb-3">You haven't started this workout yet.</p>
                      <button
                        onClick={handleStartWorkout}
                        className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Start Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Sections Tab */}
          {activeTab === "sections" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-bold mb-6">Workout Sections</h2>

              <div className="space-y-6">
                {workout.sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSectionExpand(index)}
                      className="w-full flex items-center justify-between p-4 bg-[#F7F7FD] hover:bg-[#ECECEE] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00A8FF] text-white flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      {expandedSections[index] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSections[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-white">
                            {section.exercises.length > 0 ? (
                              <div className="space-y-4">
                                {section.exercises.map(
                                  (exercise, idx) =>
                                    exercise.name && (
                                      <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                          <img
                                            src={exercise.thumbnail || "/placeholder.svg"}
                                            alt={exercise.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                              e.target.src = "/placeholder.svg?height=80&width=80"
                                            }}
                                          />
                                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center">
                                            {exercise.duration}
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="font-medium">{exercise.name}</h4>
                                          <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {exercise.duration}
                                          </p>
                                        </div>
                                      </div>
                                    ),
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-center py-4">No exercises in this section</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-[#F7F7FD] p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Ratings & Reviews</h3>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{workout.averageRating || "0"}</div>
                        <div className="flex text-yellow-400 justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              fill={i < Math.floor(workout.averageRating) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{workout.totalRatings || 0} ratings</p>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium w-3">{rating}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${
                                    workout.totalRatings ? (ratingCounts[rating] / workout.totalRatings) * 100 : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 w-8">{ratingCounts[rating]}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {progressData?.isCompleted && !reviews.some((r) => isUserReview(r)) && (
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="w-full bg-[#00A8FF] hover:bg-[#0096E6] text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        Write a Review
                      </button>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">User Reviews</h3>

                    <div className="flex gap-2">
                      {["all", "5", "4", "3", "2", "1"].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRatingFilter(star)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            ratingFilter === star
                              ? "bg-[#00A8FF] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {star === "all" ? "All" : `${star}★`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredReviews.length > 0 ? (
                    <div className="space-y-6">
                      {filteredReviews.slice(0, visibleReviews).map((review) => (
                        <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-3 mb-3">
                              <img
                                src={review.user?.profilePicture || "/placeholder.svg"}
                                alt={`${review.user?.firstName} ${review.user?.lastName}`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium">
                                  {review.user?.firstName} {review.user?.lastName}
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="w-4 h-4"
                                        fill={i < review.rating ? "currentColor" : "none"}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
                                </div>
                              </div>
                            </div>

                            {isUserReview(review) && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setNewReview({ comment: review.comment, rating: review.rating })
                                    setEditingReviewId(review._id)
                                    setShowReviewModal(true)
                                  }}
                                  className="text-gray-400 hover:text-[#00A8FF] p-1"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteReview(review._id)}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>

                          <p className="text-gray-700">{review.comment}</p>

                          <div className="mt-3 flex items-center gap-4">
                            <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
                              <ThumbsUp className="w-4 h-4" /> Helpful
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
                              <MessageSquare className="w-4 h-4" /> Reply
                            </button>
                          </div>
                        </div>
                      ))}

                      {visibleReviews < filteredReviews.length && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() => setVisibleReviews((prev) => prev + 3)}
                            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                          >
                            Load More Reviews
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium text-lg mb-1">No Reviews Yet</h3>
                      <p className="text-gray-500 mb-4">
                        {ratingFilter !== "all"
                          ? `There are no ${ratingFilter}-star reviews yet.`
                          : "Be the first to review this workout!"}
                      </p>
                      {progressData?.isCompleted && !reviews.some((r) => isUserReview(r)) && (
                        <button
                          onClick={() => setShowReviewModal(true)}
                          className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
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
              ref={reviewFormRef}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{editingReviewId ? "Edit Your Review" : "Write a Review"}</h3>
                <button
                  onClick={() => {
                    setShowReviewModal(false)
                    if (!editingReviewId) {
                      setNewReview({ comment: "", rating: 0 })
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                      className="text-2xl focus:outline-none"
                    >
                      <Star
                        className="w-8 h-8"
                        fill={star <= newReview.rating ? "#FBBF24" : "none"}
                        stroke={star <= newReview.rating ? "#FBBF24" : "currentColor"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience with this workout..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8FF] focus:border-[#00A8FF]"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewModal(false)
                    if (!editingReviewId) {
                      setNewReview({ comment: "", rating: 0 })
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitReview}
                  className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 rounded-md text-white"
                >
                  {editingReviewId ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
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
                <h3 className="text-xl font-semibold">Workout Information</h3>
                <button onClick={() => setShowInfoModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Difficulty Level</h4>
                  <p className="text-gray-600 text-sm">
                    This workout is rated as <span className="font-medium">{workout.difficulty}</span>, making it
                    suitable for{" "}
                    {workout.difficulty === "Easy"
                      ? "beginners"
                      : workout.difficulty === "Medium"
                        ? "intermediate"
                        : "advanced"}{" "}
                    fitness levels.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Calories</h4>
                  <p className="text-gray-600 text-sm">
                    You can expect to burn approximately <span className="font-medium">{workout.calorie} calories</span>{" "}
                    during this workout, depending on your intensity and body composition.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Duration</h4>
                  <p className="text-gray-600 text-sm">
                    This workout takes <span className="font-medium">{workout.duration} minutes</span> to complete,
                    including all sections.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Focus Area</h4>
                  <p className="text-gray-600 text-sm">
                    This workout primarily focuses on{" "}
                    <span className="font-medium capitalize">{workout.aim || "general fitness"}</span>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowInfoModal(false)}
                className="mt-6 w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-md text-gray-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkoutDetailPage
