import React, { useState } from "react";

const RatingModal = ({ workoutId, onClose }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    if (!selectedRating) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:8000/api/workouts/rate/${workoutId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rating: selectedRating }),
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose(); // Auto-close after success
      }, 1500);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Error rating workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-8 relative">

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-center text-[#0E0E2C] mb-6">
              Rate this Workout
            </h2>

            <div className="flex justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className={`text-4xl cursor-pointer transition-transform ${
                    (hoveredRating || selectedRating) >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              onClick={submitRating}
              disabled={!selectedRating || loading}
              className="w-full bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white font-bold py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Rating"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Thank you!
            </h2>
            <p className="text-gray-600">Your feedback helps us grow stronger 💪</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;
