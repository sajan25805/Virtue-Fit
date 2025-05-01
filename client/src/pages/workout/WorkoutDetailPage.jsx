"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Flame, BarChart, Calendar, Star, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const videoRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const hasReviewed = reviews.some((r) => r.user?._id === userId);
  const isCompleted = progressData?.isCompleted;

  // Initial data fetch
  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`http://localhost:8000/api/workouts/${id}`);
      const data = await res.json();
      setWorkout(data);
    };
    fetchWorkout();
    refreshData();
  }, [id]);

  const refreshData = async () => {
    const [reviewsRes, progressRes] = await Promise.all([
      fetch(`http://localhost:8000/api/workouts/${id}/reviews`, { credentials: "include" }),
      fetch("http://localhost:8000/api/workout-progress/user", { credentials: "include" }),
    ]);
    const reviewsData = await reviewsRes.json();
    const progressDataRaw = await progressRes.json();

    if (reviewsData.success) setReviews(reviewsData.reviews);
    const match = progressDataRaw.progress.find((p) => p.workout._id === id);
    if (match) setProgressData(match);
  };

  const handleStartWorkout = async () => {
    if (!progressData) {
      const res = await fetch("http://localhost:8000/api/workout-progress/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ workoutId: id }),
      });
      const data = await res.json();
      if (data.success) setProgressData(data.progress);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setVideoProgress((current / duration) * 100);
  };

  const markWorkoutComplete = async () => {
    if (!progressData?._id) return;
    const res = await fetch(`http://localhost:8000/api/workout-progress/complete/${progressData._id}`, {
      method: "PATCH",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      toast.success("🎉 Workout marked as completed!");
      await refreshData();
      setShowReviewModal(true);
    } else {
      toast.error("Failed to mark as complete");
    }
  };

  const submitReview = async () => {
    const res = await fetch(`http://localhost:8000/api/workouts/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newReview),
    });
    const data = await res.json();
    if (data.success) {
      setReviews((prev) => [...prev, data.review]);
      setNewReview({ comment: "", rating: 0 });
    } else {
      toast.error(data.message);
    }
  };

  const updateReview = async () => {
    const res = await fetch(`http://localhost:8000/api/workouts/${id}/review/${editingReviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newReview),
    });
    const data = await res.json();
    if (data.success) {
      setReviews((prev) =>
        prev.map((r) => (r._id === editingReviewId ? data.review : r))
      );
      setEditingReviewId(null);
      setNewReview({ comment: "", rating: 0 });
    }
  };

  const deleteReview = async (reviewId) => {
    const res = await fetch(`http://localhost:8000/api/workouts/${id}/review/${reviewId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } else {
      toast.error(data.message);
    }
  };

  if (!workout) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Link to="/workout" className="text-blue-600 flex items-center mb-4">
        <ArrowLeft className="mr-2" /> Back
      </Link>

      <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
      <p className="text-gray-600 mb-6">{workout.description}</p>

      <video
        ref={videoRef}
        controls
        onPlay={handleStartWorkout}
        onTimeUpdate={handleTimeUpdate}
        poster={workout.thumbnail}
        className="w-full rounded-md mb-4"
      >
        <source src={workout.videoUrl} type="video/mp4" />
      </video>

      {isCompleted ? (
        <div className="flex items-center justify-center gap-2 text-green-600 font-semibold mt-4">
          <CheckCircle className="w-5 h-5" />
          Workout Completed
        </div>
      ) : (
        videoProgress >= 90 &&
        progressData && (
          <button
            onClick={markWorkoutComplete}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Mark as Complete
          </button>
        )
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {reviews.map((r) => (
          <div key={r._id} className="p-4 border rounded mb-3 bg-white">
            <div className="flex items-center gap-3">
              {r.user?.profilePicture && (
                <img
                  src={r.user.profilePicture}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{r.user?.name}</p>
                <div className="flex text-yellow-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" />
                  ))}
                </div>
                <p>{r.comment}</p>
              </div>
            </div>
            {r.user?._id === userId && (
              <div className="mt-2 flex gap-4 text-sm">
                <button onClick={() => {
                  setNewReview({ comment: r.comment, rating: r.rating });
                  setEditingReviewId(r._id);
                  setShowReviewModal(true);
                }} className="text-blue-600">Edit</button>
                <button onClick={() => deleteReview(r._id)} className="text-red-500">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && isCompleted && !hasReviewed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-md w-[90%] max-w-md relative">
            <h3 className="text-xl font-bold mb-4">{editingReviewId ? "Edit" : "Rate"} Workout</h3>

            <textarea
              className="w-full border p-2 rounded mb-3"
              rows={3}
              placeholder="Your comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`w-6 h-6 cursor-pointer ${newReview.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowReviewModal(false)} className="text-sm text-gray-500">Cancel</button>
              <button
                onClick={() => {
                  editingReviewId ? updateReview() : submitReview();
                  setShowReviewModal(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editingReviewId ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
