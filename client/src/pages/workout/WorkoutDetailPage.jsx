import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Star, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

const WorkoutDetailPage = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [workout, setWorkout] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [visibleReviews, setVisibleReviews] = useState(3);
  const userId = localStorage.getItem("userId")?.trim();

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`http://localhost:8000/api/workouts/${id}`);
      const data = await res.json();
      setWorkout(data);
    };
    const fetchProgress = async () => {
      const res = await fetch(`http://localhost:8000/api/workout-progress/user`, { credentials: "include" });
      const data = await res.json();
      const match = data.progress.find((p) => p.workout._id === id);
      if (match) setProgressData(match);
    };
    const fetchReviews = async () => {
      const res = await fetch(`http://localhost:8000/api/workouts/${id}/reviews`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setReviews(data.reviews);
    };
    fetchWorkout();
    fetchProgress();
    fetchReviews();
  }, [id]);

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

  const handleMarkComplete = async () => {
    const res = await fetch(`http://localhost:8000/api/workout-progress/complete/${progressData._id}`, {
      method: "PATCH",
      credentials: "include"
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Workout marked as complete!");
      setProgressData({ ...progressData, isCompleted: true });
    }
  };

  const submitReview = async () => {
    const url = editingReviewId
      ? `http://localhost:8000/api/workouts/${id}/review/${editingReviewId}`
      : `http://localhost:8000/api/workouts/${id}/review`;
    const method = editingReviewId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newReview),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(`Review ${editingReviewId ? "updated" : "submitted"}`);
      setShowReviewModal(false);
      setEditingReviewId(null);
      setNewReview({ comment: "", rating: 0 });
      const fetchReviews = await fetch(`http://localhost:8000/api/workouts/${id}/reviews`, { credentials: "include" });
      const updated = await fetchReviews.json();
      setReviews(updated.reviews);
    } else {
      toast.error(data.message);
    }
  };

  const deleteReview = async (reviewId) => {
    const res = await fetch(`http://localhost:8000/api/workouts/${id}/review/${reviewId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Review deleted");
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    }
  };

  const isUserReview = (r) => r?.user?._id?.toString() === userId;

  const filteredReviews = reviews.filter(r =>
    ratingFilter === "all" ? true : r.rating === ratingFilter
  );

  return (
    <div className="pt-10 pb-20 px-6 max-w-4xl mx-auto text-[#0E0E2C] bg-[#F7F7FD]">
      {workout && (
        <>
          <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
          <p className="text-sm text-[#0E0E2C] mb-6 opacity-80">{workout.description}</p>

          <video
            ref={videoRef}
            controls
            onPlay={handleStartWorkout}
            onTimeUpdate={handleTimeUpdate}
            className="w-full mb-4 rounded-lg"
            poster={workout.thumbnail}
          >
            <source src={workout.videoUrl} type="video/mp4" />
          </video>

          {!progressData?.isCompleted && videoProgress >= 90 && (
            <button
              onClick={handleMarkComplete}
              className="mt-4 px-5 py-2 bg-[#00A8FF] hover:opacity-90 text-white rounded shadow"
            >
              <CheckCircle className="w-4 h-4 inline-block mr-1" /> Mark as Complete
            </button>
          )}

          {progressData?.isCompleted && (
            <div className="mt-4 text-green-500 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Workout Completed
            </div>
          )}
          
            <div className="my-10">
              <h2 className="text-xl font-semibold mb-2">Trainer</h2>
              <div className="flex gap-4 items-center">
                <img
                  src={workout.trainer?.profilePicture}
                  alt="trainer"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <p className="text-lg font-bold">{workout.trainer?.name}</p>
                  <p className="text-sm text-[#0E0E2C] opacity-80">{workout.trainer?.specialization}</p>
                  {workout.trainer?.isVerified && (
                    <span className="text-green-600 text-sm font-medium">✅ Verified Trainer</span>
                  )}
                  {workout.trainer?.bio && (
                    <p className="text-sm mt-2 text-[#0E0E2C] opacity-70">{workout.trainer.bio}</p>
                  )}
                </div>
              </div>
            </div>


          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Workout Sections</h2>
            {workout.sections.map((section, index) => (
              <div key={index} className="mb-6 bg-gradient-to-br from-[#0E0E2C] to-[#1f1f3a] rounded-xl p-4 shadow-md text-[#ECECEE]">
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-[#ECECEE] mb-3">{section.description}</p>
                <div className="space-y-4">
                  {section.exercises.map((exercise, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#ECECEE] p-3 rounded-lg text-[#0E0E2C]">
                      <img src={exercise.thumbnail} alt={exercise.name} className="w-16 h-16 object-cover rounded border border-[#ECECEE]" />
                      <div>
                        <p className="font-semibold">{exercise.name}</p>
                        <p className="text-sm opacity-70">Duration: {exercise.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Reviews</h2>

            {progressData?.isCompleted && !reviews.some(r => r?.user?._id?.toString() === userId) && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="mb-4 px-4 py-2 bg-[#00A8FF] text-white rounded hover:opacity-90"
              >
                Add Review
              </button>
            )}

            <div className="flex gap-3 mb-4">
              {["all", 5, 4, 3, 2, 1].map(star => (
                <button
                  key={star}
                  onClick={() => setRatingFilter(star)}
                  className={`px-3 py-1 rounded ${
                    ratingFilter === star ? "bg-[#00A8FF] text-white" : "bg-[#ECECEE] text-[#0E0E2C]"
                  }`}
                >
                  {star === "all" ? "All" : `${star}★`}
                </button>
              ))}
            </div>

            {filteredReviews.slice(0, visibleReviews).map((r) => (
              <div key={r._id} className="bg-gradient-to-br from-[#0E0E2C] to-[#1f1f3a] p-4 rounded mb-3 text-[#ECECEE]">
                <div className="flex items-center gap-3 mb-2">
                  <img src={r.user?.profilePicture} className="w-10 h-10 rounded-full" alt="avatar" />
                  <div>
                    <p className="font-semibold">{r.user?.firstName} {r.user?.lastName}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#ECECEE] mb-2">{r.comment}</p>
                {isUserReview(r) && (
                  <div className="flex gap-4 text-sm">
                    <button onClick={() => {
                      setNewReview({ comment: r.comment, rating: r.rating });
                      setEditingReviewId(r._id);
                      setShowReviewModal(true);
                    }} className="text-blue-400 flex items-center gap-1"><Pencil className="w-4 h-4" /> Edit</button>
                    <button onClick={() => deleteReview(r._id)} className="text-red-400 flex items-center gap-1"><Trash className="w-4 h-4" /> Delete</button>
                  </div>
                )}
              </div>
            ))}

            {visibleReviews < filteredReviews.length && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setVisibleReviews(prev => prev + 3)}
                  className="text-[#00A8FF] hover:underline"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutDetailPage;
