// TimelineWorkout.jsx
import { CheckCircle, Circle, PlayCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function TimelineWorkout({ workouts = [], progressList = [], reviews = [] }) {
  const getWorkoutStatus = (workoutId) => {
    const progress = progressList.find((p) => p.workout === workoutId);
    if (progress) {
      return progress.isCompleted ? "completed" : "in-progress";
    }
    return "not-started";
  };

  const getAverageRating = (workoutId) => {
    const workoutReviews = reviews.filter((r) => r.workout === workoutId);
    if (workoutReviews.length === 0) return 0;
    const total = workoutReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / workoutReviews.length;
  };

  return (
    <div className="space-y-4">
      {workouts.map((workout) => {
        const status = getWorkoutStatus(workout._id);
        const avgRating = getAverageRating(workout._id);
        const icon = status === "completed" ? (
          <CheckCircle className="text-green-500" />
        ) : status === "in-progress" ? (
          <PlayCircle className="text-blue-500 animate-pulse" />
        ) : (
          <Circle className="text-gray-400" />
        );

        return (
          <div key={workout._id} className="relative flex items-start gap-4">
            <div className="mt-2">{icon}</div>
            <Link
              to={`/workout/${workout._id}`}
              className={`flex-1 p-4 rounded-md shadow transition ${
                status === "in-progress"
                  ? "bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white"
                  : "bg-white text-[#0E0E2C]"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={workout.thumbnail || "/placeholder.svg"}
                  alt="Workout"
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg mb-1">{workout.title}</h3>
                  <p className="text-sm text-gray-200 md:text-gray-600">
                    ⏱ {workout.duration} min • {workout.equipment || "No Equipment"}
                  </p>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-4 h-4 ${
                          n <= Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
