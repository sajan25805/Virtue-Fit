import { Link } from "react-router-dom"
import { BarChart3, Users, Dumbbell, Brain, Coffee } from "lucide-react"
import useStore from "../store/store"
import StatCard from "../components/StatCard"

const Dashboard = () => {
  const { meals, meditations, programs, workouts } = useStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Trainer Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors">
            <Users size={18} />
            <span>My Clients</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Meals"
          value={meals.length}
          icon={<Coffee className="h-6 w-6 text-secondary" />}
          change="+2 this week"
        />
        <StatCard
          title="Total Meditations"
          value={meditations.length}
          icon={<Brain className="h-6 w-6 text-secondary" />}
          change="+1 this week"
        />
        <StatCard
          title="Total Programs"
          value={programs.length}
          icon={<BarChart3 className="h-6 w-6 text-secondary" />}
          change="No change"
        />
        <StatCard
          title="Total Workouts"
          value={workouts.length}
          icon={<Dumbbell className="h-6 w-6 text-secondary" />}
          change="+3 this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Recent Programs</h2>
          <div className="space-y-4">
            {programs.slice(0, 3).map((program) => (
              <div key={program.id} className="p-4 border border-neutral-secondary rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-primary">{program.name}</h3>
                    <p className="text-sm text-primary/70">{program.goal}</p>
                  </div>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                    {program.workouts.length} workouts
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/programs" className="mt-4 inline-block text-secondary font-medium text-sm hover:underline">
            View all programs →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Recent Workouts</h2>
          <div className="space-y-4">
            {workouts.slice(0, 3).map((workout) => (
              <div key={workout.id} className="p-4 border border-neutral-secondary rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-primary">{workout.title}</h3>
                    <p className="text-sm text-primary/70">{workout.aim}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      workout.difficulty === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : workout.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {workout.difficulty}
                  </span>
                </div>
                <p className="text-xs text-primary/60 mt-2">{workout.duration}</p>
              </div>
            ))}
          </div>
          <Link to="/workouts" className="mt-4 inline-block text-secondary font-medium text-sm hover:underline">
            View all workouts →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

