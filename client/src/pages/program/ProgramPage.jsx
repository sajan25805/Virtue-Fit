import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalFilter, setGoalFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/programs");
      const data = await res.json();
      setPrograms(data.programs || []);
    } catch (err) {
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs
    .filter((p) => (goalFilter === "all" ? true : p.goal === goalFilter))
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#F7F7FD] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0E0E2C]">Programs</h1>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
          <input
            type="text"
            placeholder="Search programs..."
            className="px-4 py-2 border rounded-md shadow-sm w-full sm:max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            {["all", "strength", "weight-loss", "relaxation", "muscle-gain"].map((g) => (
              <button
                key={g}
                onClick={() => setGoalFilter(g)}
                className={`px-3 py-1 rounded-md border text-sm font-medium ${
                  goalFilter === g
                    ? "bg-[#0E0E2C] text-white"
                    : "bg-white text-[#0E0E2C] border-[#ECECEE]"
                }`}
              >
                {g === "all" ? "All" : g.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#00A8FF] rounded-full mx-auto mb-2"></div>
            <p className="text-[#0E0E2C]">Loading programs...</p>
          </div>
        )}

        {/* Program Cards */}
        {!loading && filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Link
                to={`/programs/${program._id}`}
                key={program._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition border border-[#ECECEE] p-4"
              >
                <h3 className="text-lg font-bold text-[#0E0E2C] mb-1">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 capitalize">
                  Goal: {program.goal}
                </p>
                <p className="text-sm text-gray-500">
                  Workouts: {program.workouts.length} | Meals:{" "}
                  {program.meals.length} | Snacks: {program.snacks.length}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-500 py-10">
              No programs found for this filter.
            </div>
          )
        )}
      </div>
    </div>
  );
}
