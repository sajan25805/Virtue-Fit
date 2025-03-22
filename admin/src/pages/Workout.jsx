// "use client"

// import { useState } from "react"
// import { Textarea } from "../components/ui/textarea"
// import { Select } from "../components/ui/select"
// import {useWorkoutStore} from "../store/workout-store"
// import { Dumbbell, Edit, Trash, Plus, X } from "lucide-react"

// export function Workout() {
//   const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkoutStore()
//   const [isAdding, setIsAdding] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     difficulty: "Easy",
//     type: "Strength",
//     duration: 30,
//   })
//   const [filters, setFilters] = useState({
//     difficulty: "All",
//     type: "All",
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (editingId) {
//       updateWorkout(editingId, { ...formData })
//       setEditingId(null)
//     } else {
//       addWorkout({
//         ...formData,
//         id: Date.now().toString(),
//         createdAt: Date.now(),
//       })
//     }
//     setIsAdding(false)
//     setFormData({
//       name: "",
//       description: "",
//       difficulty: "Easy",
//       type: "Strength",
//       duration: 30,
//     })
//   }

//   const handleEdit = (workout) => {
//     setFormData({
//       name: workout.name,
//       description: workout.description,
//       difficulty: workout.difficulty,
//       type: workout.type,
//       duration: workout.duration,
//     })
//     setEditingId(workout.id)
//     setIsAdding(true)
//   }

//   const filteredWorkouts = workouts.filter((workout) => {
//     return (
//       (filters.difficulty === "All" || workout.difficulty === filters.difficulty) &&
//       (filters.type === "All" || workout.type === filters.type)
//     )
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Workout Management</h1>
//         <button
//           onClick={() => {
//             setIsAdding(true)
//             setEditingId(null)
//             setFormData({
//               name: "",
//               description: "",
//               difficulty: "Easy",
//               type: "Strength",
//               duration: 30,
//             })
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 text-white rounded"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Workout
//         </button>
//       </div>

//       {isAdding && (
//         <div className="p-6 border rounded-md shadow-sm">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">{editingId ? "Edit Workout" : "Add New Workout"}</h2>
//             <button
//               className="text-gray-500"
//               onClick={() => {
//                 setIsAdding(false)
//                 setEditingId(null)
//               }}
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="mb-1 block text-sm font-medium">
//                 Workout Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="mb-1 block text-sm font-medium">
//                 Description
//               </label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={3}
//               />
//             </div>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <div>
//                 <label htmlFor="difficulty" className="mb-1 block text-sm font-medium">
//                   Difficulty
//                 </label>
//                 <Select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleInputChange}>
//                   <option value="Easy">Easy</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Hard">Hard</option>
//                 </Select>
//               </div>
//               <div>
//                 <label htmlFor="type" className="mb-1 block text-sm font-medium">
//                   Type
//                 </label>
//                 <Select id="type" name="type" value={formData.type} onChange={handleInputChange}>
//                   <option value="Strength">Strength</option>
//                   <option value="Cardio">Cardio</option>
//                   <option value="Flexibility">Flexibility</option>
//                 </Select>
//               </div>
//               <div>
//                 <label htmlFor="duration" className="mb-1 block text-sm font-medium">
//                   Duration (minutes)
//                 </label>
//                 <input
//                   id="duration"
//                   name="duration"
//                   type="number"
//                   min="1"
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6] px-4 py-2 text-white rounded">
//                 {editingId ? "Update Workout" : "Add Workout"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="flex flex-wrap gap-4">
//         <div>
//           <label htmlFor="difficultyFilter" className="mb-1 block text-sm font-medium">
//             Filter by Difficulty
//           </label>
//           <Select
//             id="difficultyFilter"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
//           >
//             <option value="All">All Difficulties</option>
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </Select>
//         </div>
//         <div>
//           <label htmlFor="typeFilter" className="mb-1 block text-sm font-medium">
//             Filter by Type
//           </label>
//           <Select
//             id="typeFilter"
//             value={filters.type}
//             onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//           >
//             <option value="All">All Types</option>
//             <option value="Strength">Strength</option>
//             <option value="Cardio">Cardio</option>
//             <option value="Flexibility">Flexibility</option>
//           </Select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredWorkouts.length > 0 ? (
//           filteredWorkouts.map((workout) => (
//             <div key={workout.id} className="p-6 border rounded-md shadow-sm">
//               <div className="mb-4 flex items-center">
//                 <div className="rounded-full bg-blue-100 p-2 text-blue-600">
//                   <Dumbbell className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-semibold">{workout.name}</h3>
//                   <p className="text-sm text-gray-500">{workout.type}</p>
//                 </div>
//                 <div className="ml-auto flex space-x-2">
//                   <button onClick={() => handleEdit(workout)} className="text-blue-600">
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button onClick={() => deleteWorkout(workout.id)} className="text-red-600">
//                     <Trash className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//               <p className="mb-3 text-sm">{workout.description}</p>
//               <div className="flex items-center justify-between">
//                 <span
//                   className={`rounded-full px-2 py-1 text-xs ${
//                     workout.difficulty === "Easy"
//                       ? "bg-green-100 text-green-600"
//                       : workout.difficulty === "Medium"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {workout.difficulty}
//                 </span>
//                 <span className="text-sm">{workout.duration} minutes</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No workouts found</p>
//         )}
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { useWorkoutStore } from "../store/workout-store"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select } from "../components/ui/select"
import { Filter, FilterGroup } from "../components/ui/filter"
import { Dumbbell, Edit, Trash, Plus, X } from "lucide-react"

export function WorkoutManagement() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkoutStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "Easy",
    type: "Strength",
    duration: 30,
  })
  const [filters, setFilters] = useState({
    difficulty: "All",
    type: "All",
  })

  const difficultyOptions = [
    { label: "All Difficulties", value: "All" },
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ]

  const typeOptions = [
    { label: "All Types", value: "All" },
    { label: "Strength", value: "Strength" },
    { label: "Cardio", value: "Cardio" },
    { label: "Flexibility", value: "Flexibility" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateWorkout(editingId, { ...formData })
      setEditingId(null)
    } else {
      addWorkout({
        ...formData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      })
    }
    setIsAdding(false)
    setFormData({
      name: "",
      description: "",
      difficulty: "Easy",
      type: "Strength",
      duration: 30,
    })
  }

  const handleEdit = (workout) => {
    setFormData({
      name: workout.name,
      description: workout.description,
      difficulty: workout.difficulty,
      type: workout.type,
      duration: workout.duration,
    })
    setEditingId(workout.id)
    setIsAdding(true)
  }

  const filteredWorkouts = workouts.filter((workout) => {
    return (
      (filters.difficulty === "All" || workout.difficulty === filters.difficulty) &&
      (filters.type === "All" || workout.type === filters.type)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workout Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              name: "",
              description: "",
              difficulty: "Easy",
              type: "Strength",
              duration: 30,
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Workout
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Workout" : "Add New Workout"}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAdding(false)
                setEditingId(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Workout Name
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="difficulty" className="mb-1 block text-sm font-medium">
                  Difficulty
                </label>
                <Select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleInputChange}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
              </div>
              <div>
                <label htmlFor="type" className="mb-1 block text-sm font-medium">
                  Type
                </label>
                <Select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Flexibility">Flexibility</option>
                </Select>
              </div>
              <div>
                <label htmlFor="duration" className="mb-1 block text-sm font-medium">
                  Duration (minutes)
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
                {editingId ? "Update Workout" : "Add Workout"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <FilterGroup>
        <Filter
          label="Filter by Difficulty"
          options={difficultyOptions}
          value={filters.difficulty}
          onChange={(value) => setFilters({ ...filters, difficulty: value })}
          className="w-full max-w-xs"
        />
        <Filter
          label="Filter by Type"
          options={typeOptions}
          value={filters.type}
          onChange={(value) => setFilters({ ...filters, type: value })}
          className="w-full max-w-xs"
        />
      </FilterGroup>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <Card key={workout.id} className="p-6">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{workout.name}</h3>
                  <p className="text-sm text-gray-500">{workout.type}</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(workout)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteWorkout(workout.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mb-3 text-sm">{workout.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    workout.difficulty === "Easy"
                      ? "bg-green-100 text-green-600"
                      : workout.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {workout.difficulty}
                </span>
                <span className="text-sm">{workout.duration} minutes</span>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No workouts found</p>
        )}
      </div>
    </div>
  )
}

