import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProgramDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/programs/${id}`);
        const data = await res.json();
        setProgram(data.program);

        const progressRes = await fetch(`http://localhost:8000/api/programs/${id}/progress`, {
          credentials: "include"
        });

        if (progressRes.ok) {
          const progressData = await progressRes.json();
          setProgress(progressData.progress);
          setIsEnrolled(true);
        }
      } catch (error) {
        console.error("Failed to load program", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/programs/${id}/enroll`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Enrolled successfully!");
        setIsEnrolled(true);
        setProgress(data.progress);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to enroll");
    }
  };

  const isItemCompleted = (type, itemId) => {
    return progress?.completed?.[type]?.includes(itemId);
  };

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;

  return (
    <div className="bg-[#0E0E2C] min-h-screen text-white p-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
        <p className="text-blue-400 font-medium mb-6">Goal: {program.goal}</p>

        {!isEnrolled ? (
          <button
            onClick={handleEnroll}
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Enroll in Program
          </button>
        ) : (
          <div className="text-green-400 mb-6">✅ Enrolled</div>
        )}

        {/* Workouts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🏋️ Workouts</h2>
          <div className="space-y-3">
            {program.workouts.map((w) => (
              <Link
                to={`/workout/${w._id}`}
                key={w._id}
                className={`block p-3 rounded-md transition border ${
                  isItemCompleted("workouts", w._id)
                    ? "bg-green-600 border-green-700"
                    : "bg-[#1f1f3a] border-[#333]"
                }`}
              >
                <p className="font-semibold">{w.title}</p>
                <p className="text-sm text-gray-300">{w.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Meals */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🍽️ Meals</h2>
          <div className="space-y-3">
            {program.meals.map((m) => (
              <Link
                to={`/meal/${m._id}`}
                key={m._id}
                className={`block p-3 rounded-md transition border ${
                  isItemCompleted("meals", m._id)
                    ? "bg-green-600 border-green-700"
                    : "bg-[#1f1f3a] border-[#333]"
                }`}
              >
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-gray-300">{m.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Snacks */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🥜 Snacks</h2>
          <div className="space-y-3">
            {program.snacks.map((s) => (
              <Link
                to={`/snack/${s._id}`}
                key={s._id}
                className={`block p-3 rounded-md transition border ${
                  isItemCompleted("snacks", s._id)
                    ? "bg-green-600 border-green-700"
                    : "bg-[#1f1f3a] border-[#333]"
                }`}
              >
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-300">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Meditations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🧘 Meditations</h2>
          <div className="space-y-4">
            {program.meditations.map((week, i) => (
              <div key={i}>
                <h3 className="text-lg font-medium mb-2">Week {i + 1}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {week.map((m) => (
                    <Link
                      to={`/meditation/${m._id}`}
                      key={m._id}
                      className={`block p-3 rounded-md transition border ${
                        isItemCompleted("meditations", m._id)
                          ? "bg-green-600 border-green-700"
                          : "bg-[#1f1f3a] border-[#333]"
                      }`}
                    >
                      <p className="font-semibold">{m.title}</p>
                      <p className="text-sm text-gray-300">{m.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
