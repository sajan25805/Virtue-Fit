import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AudioLines, Clock, Target } from "lucide-react";

const MeditationPage = () => {
  const [meditations, setMeditations] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["Mindfulness", "Relaxation", "Sleep", "Focus", "Breathing"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

useEffect(() => {
  const fetchMeditations = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/meditations");
      const data = await res.json();
      console.log("API Data:", data); // Debug

      // ✅ Handle array response
      if (Array.isArray(data)) {
        setMeditations(data);
      } else {
        throw new Error("Expected an array of meditations");
      }
    } catch (err) {
      setError("Failed to load meditations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchMeditations();
}, []);

  const filteredMeditations = meditations.filter((m) => {
    return (
      (categoryFilter === "all" || m.category === categoryFilter) &&
      (levelFilter === "all" || m.level === levelFilter)
    );
  });

  return (
    <div className="bg-[#F7F7FD] min-h-screen py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] rounded-lg p-6 mb-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Meditations</h1>
          <p className="mt-2">Find the perfect session to calm your mind and body</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-4 py-2 rounded-md font-semibold ${
              categoryFilter === "all"
                ? "bg-[#00A8FF] text-white shadow"
                : "bg-white text-[#0E0E2C] border border-gray-300 hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-md font-semibold ${
                categoryFilter === cat
                  ? "bg-[#00A8FF] text-white shadow"
                  : "bg-white text-[#0E0E2C] border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setLevelFilter("all")}
            className={`px-4 py-2 rounded-md font-semibold ${
              levelFilter === "all"
                ? "bg-[#00A8FF] text-white shadow"
                : "bg-white text-[#0E0E2C] border border-gray-300 hover:bg-gray-100"
            }`}
          >
            All Levels
          </button>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-4 py-2 rounded-md font-semibold ${
                levelFilter === lvl
                  ? "bg-[#00A8FF] text-white shadow"
                  : "bg-white text-[#0E0E2C] border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]" />
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        ) : filteredMeditations.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No meditations found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMeditations.map((m) => (
              <Link
                to={`/meditation/${m._id}`}
                key={m._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={m.thumbnail || "/placeholder.svg"}
                    alt={m.title}
                    className="w-full h-48 object-cover rounded-t"
                  />
                  <div className="absolute top-2 right-2 bg-[#00A8FF] text-white text-xs px-2 py-1 rounded-full shadow">
                    {m.level}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#0E0E2C] mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{m.description}</p>
                  <div className="flex items-center justify-between text-sm text-[#0E0E2C]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#00A8FF]" />
                      {m.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-[#00A8FF]" />
                      {m.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <AudioLines className="h-4 w-4 text-[#00A8FF]" />
                      Audio
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationPage;
