import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  ListTodo,
  Dumbbell,
  Soup,
  Salad,
  Brain,
} from "lucide-react";

export default function PlannerPage() {
  const [planner, setPlanner] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/planners", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.plan) {
          setPlanner(data.plan);
        } else {
          setPlanner([]);
          toast.error("No planner found. Enroll in a program to get started!");
        }
      } catch (err) {
        toast.error("Error loading planner");
      }
    };
    fetchPlanner();
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case "workout": return <Dumbbell className="w-5 h-5 text-white" />;
      case "meal": return <Soup className="w-5 h-5 text-white" />;
      case "snack": return <Salad className="w-5 h-5 text-white" />;
      case "meditation": return <Brain className="w-5 h-5 text-white" />;
      default: return null;
    }
  };

  const renderItem = (item, index) => {
    const bgColor = {
      workout: "bg-blue-600",
      meal: "bg-green-600",
      snack: "bg-yellow-500",
      meditation: "bg-purple-600",
    }[item.type];

    return (
      <div key={index} className="flex items-center gap-4 rounded-lg p-4 shadow bg-[#1f1f3a] text-white">
        <div className={`${bgColor} p-2 rounded-full`}>{renderIcon(item.type)}</div>
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {item.type}: {item.data?.title || item.data?.name}
          </h3>
          <p className="text-sm text-gray-300">{new Date(item.date).toDateString()}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E0E2C] to-[#1f1f3a] p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Planner</h1>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${viewMode === "list" ? "bg-blue-600" : "bg-gray-700"}`}
              onClick={() => setViewMode("list")}
            >
              <ListTodo className="w-5 h-5" />
            </button>
            <button
              className={`px-4 py-2 rounded ${viewMode === "calendar" ? "bg-blue-600" : "bg-gray-700"}`}
              onClick={() => setViewMode("calendar")}
            >
              <CalendarDays className="w-5 h-5" />
            </button>
          </div>
        </div>

        {planner.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg mb-4">No planner yet.</p>
            <p className="text-sm">Enroll in a program to generate your personalized planner.</p>
            <a href="/program" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Browse Programs
            </a>
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-4">
            {planner.map((item, index) => renderItem(item, index))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {planner.map((item, index) => (
              <div key={index} className="bg-[#2a2a42] p-4 rounded-lg text-center shadow-lg">
                <p className="text-sm text-gray-400 mb-1">{new Date(item.date).toDateString()}</p>
                <h4 className="text-lg font-bold capitalize mb-1">{item.type}</h4>
                <p className="text-sm">{item.data?.title || item.data?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
