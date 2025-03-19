"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import useStore from "../store/store"

const MealsPage = () => {
  const { meals, deleteMeal } = useStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMeals = meals.filter(
    (meal) =>
      meal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Meals</h1>
        <Link
          to="/meals/new"
          className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
        >
          <Plus size={18} />
          <span>Add Meal</span>
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primary/40" />
        </div>
        <input
          type="text"
          placeholder="Search meals..."
          className="pl-10 pr-4 py-2 w-full border border-neutral-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-secondary">
            <thead className="bg-neutral">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                >
                  Meal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                >
                  Calories
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                >
                  Macros
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                >
                  Recipe
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-secondary">
              {filteredMeals.map((meal) => (
                <tr key={meal.id} className="hover:bg-neutral/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-primary">{meal.title}</div>
                      <div className="text-sm text-primary/60">{meal.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary">{meal.calories} kcal</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        P: {meal.macronutrients.protein}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        C: {meal.macronutrients.carbs}
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        F: {meal.macronutrients.fats}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary line-clamp-2 max-w-xs">{meal.recipes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/meals/${meal.id}`}
                        className="p-1 text-primary/70 hover:text-secondary transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-1 text-primary/70 hover:text-red-500 transition-colors"
                        onClick={() => deleteMeal(meal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MealsPage

