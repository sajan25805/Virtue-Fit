"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Calendar,
  ArrowLeft,
  Award,
  User,
  Heart,
  Share2,
  Download,
} from "lucide-react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

const MeditationDetailPage = () => {
  const { id } = useParams()
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const animationRef = useRef(null)

  const [meditation, setMeditation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [liked, setLiked] = useState(false)

 useEffect(() => {
  const fetchMeditation = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/meditations/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch meditation");
      }

      const data = await res.json();
      console.log("API Response:", data); // Debug log

      // Updated response handling (no 'success' check needed)
      if (data._id) { // Check if response has meditation properties
        setMeditation(data);
      } else {
        throw new Error("Meditation not found");
      }
    } catch (error) {
      console.error("Error fetching meditation:", error);
      toast.error(error.message || "Failed to load meditation");
    } finally {
      setLoading(false);
    }
  };

  fetchMeditation();
}, [id]);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
      }

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
      }

      const handleEnded = () => {
        setPlaying(false)
        setCurrentTime(0)
        cancelAnimationFrame(animationRef.current)
      }

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
      audioRef.current.addEventListener("ended", handleEnded)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate)
          audioRef.current.removeEventListener("ended", handleEnded)
        }
      }
    }
  }, [audioRef])

  const togglePlayback = () => {
    if (playing) {
      audioRef.current.pause()
      cancelAnimationFrame(animationRef.current)
    } else {
      audioRef.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    setPlaying(!playing)
  }

  const whilePlaying = () => {
    if (progressRef.current) {
      progressRef.current.value = audioRef.current.currentTime
      setCurrentTime(audioRef.current.currentTime)
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const changeProgress = () => {
    audioRef.current.currentTime = progressRef.current.value
    setCurrentTime(progressRef.current.value)
  }

  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
  }

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10)
  }

  const toggleMute = () => {
    setMuted(!muted)
    audioRef.current.muted = !muted
  }

  const changeVolume = (e) => {
    const value = e.target.value
    setVolume(value)
    audioRef.current.volume = value
    if (value === 0) {
      setMuted(true)
    } else {
      setMuted(false)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#00A8FF] rounded-full"></div>
      </div>
    )
  }

  if (!meditation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-[#0E0E2C] p-6">
        <div className="bg-red-100 rounded-full p-6 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Meditation Not Found</h2>
        <p className="text-gray-600 mb-6">The meditation you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/meditations"
          className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-6 py-3 rounded-lg transition-colors"
        >
          Browse Meditations
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white text-[#0E0E2C] min-h-screen">
      {/* Header */}
      <div className="bg-[#F7F7FD] pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/meditations" className="inline-flex items-center text-[#00A8FF] hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meditations
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{meditation.title}</h1>
                <p className="text-gray-600 mb-4">{meditation.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    {meditation.category}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {meditation.duration} min
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {meditation.level}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(meditation.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Audio Player Section */}
      <div className="container mx-auto px-4 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail */}
            <div className="w-full md:w-5/12 relative">
              <img
                src={meditation.thumbnail || "/placeholder.svg"}
                alt={meditation.title}
                className="w-full h-full object-cover aspect-video md:aspect-square"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=400&width=400"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                <button
                  onClick={togglePlayback}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    playing ? "bg-white/20 backdrop-blur-md hover:bg-white/30" : "bg-[#00A8FF] hover:bg-[#0096E6]"
                  }`}
                >
                  {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                </button>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="w-full md:w-7/12 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{playing ? "Now Playing" : "Ready to Begin"}</h2>
                <p className="text-gray-600 mb-4 text-sm">
                  {playing
                    ? "Take a deep breath and focus on the present moment."
                    : "Press play to start your meditation journey."}
                </p>
              </div>

              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-10">{formatTime(currentTime)}</span>
                  <div className="relative flex-1">
                    <input
                      ref={progressRef}
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={changeProgress}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00A8FF]"
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-10">{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="p-2 rounded-full hover:bg-gray-100">
                      {muted ? (
                        <VolumeX className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={changeVolume}
                      className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00A8FF]"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={skipBackward} className="p-2 rounded-full hover:bg-gray-100">
                      <SkipBack className="w-5 h-5 text-gray-700" />
                    </button>

                    <button
                      onClick={togglePlayback}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        playing ? "bg-gray-100 hover:bg-gray-200" : "bg-[#00A8FF] hover:bg-[#0096E6]"
                      }`}
                    >
                      {playing ? (
                        <Pause className={`w-5 h-5 ${playing ? "text-gray-700" : "text-white"}`} />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>

                    <button onClick={skipForward} className="p-2 rounded-full hover:bg-gray-100">
                      <SkipForward className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`p-2 rounded-full hover:bg-gray-100 ${liked ? "text-red-500" : "text-gray-500"}`}
                    >
                      <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <audio ref={audioRef} src={meditation.audioUrl} preload="metadata" onEnded={() => setPlaying(false)} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trainer Info */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6">About Your Guide</h2>

          <div className="bg-[#F7F7FD] rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
              <img
                src={meditation.trainer?.profilePicture || "/placeholder.svg?height=96&width=96"}
                alt={meditation.trainerName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=96&width=96"
                }}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold">{meditation.trainerName}</h3>
              <p className="text-[#00A8FF] mb-3">{meditation.trainer?.specialization}</p>

              {meditation.trainer?.bio && (
                <p className="text-gray-600 text-sm leading-relaxed">{meditation.trainer.bio}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6">Benefits of Meditation</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Stress Reduction</h3>
              <p className="text-sm text-gray-600">
                Regular meditation helps lower stress levels and promotes a sense of calm.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Improved Focus</h3>
              <p className="text-sm text-gray-600">
                Enhance your concentration and mental clarity through mindfulness practices.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Emotional Balance</h3>
              <p className="text-sm text-gray-600">
                Develop greater emotional resilience and a more positive outlook on life.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommended Section */}
      <div className="bg-[#F7F7FD] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Enhance Your Practice</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-3">Tips for Better Meditation</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00A8FF] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Find a quiet space where you won't be disturbed
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00A8FF] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sit in a comfortable position with good posture
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00A8FF] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Use headphones for a more immersive experience
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#00A8FF] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Practice regularly for the best results
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-3">Track Your Progress</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Keep a meditation journal to note how you feel before and after each session. This helps you recognize
                  patterns and improvements over time.
                </p>
                <button className="bg-[#00A8FF] hover:bg-[#0096E6] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Start a Meditation Journal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MeditationDetailPage
