// // "use client"

// // import { useState } from "react"
// // import { useMeditationStore } from "../store/meditation-store"
// // import { Card } from "../components/ui/card"
// // import { Button } from "../components/ui/button"
// // import { Input } from "../components/ui/input"
// // import { Textarea } from "../components/ui/textarea"
// // import { Select } from "../components/ui/select"
// // import { Wind, Edit, Trash, Plus, X } from "lucide-react"

// // export function MeditationManagement() {
// //   const { meditations, addMeditation, updateMeditation, deleteMeditation } = useMeditationStore()
// //   const [isAdding, setIsAdding] = useState(false)
// //   const [editingId, setEditingId] = useState(null)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     description: "",
// //     category: "Mindfulness",
// //     duration: 10,
// //   })
// //   const [filter, setFilter] = useState("All")

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target
// //     setFormData((prev) => ({ ...prev, [name]: name === "duration" ? Number(value) : value }))
// //   }

// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     if (editingId) {
// //       updateMeditation(editingId, { ...formData })
// //       setEditingId(null)
// //     } else {
// //       addMeditation({
// //         ...formData,
// //         id: Date.now().toString(),
// //         createdAt: Date.now(),
// //       })
// //     }
// //     setIsAdding(false)
// //     setFormData({
// //       name: "",
// //       description: "",
// //       category: "Mindfulness",
// //       duration: 10,
// //     })
// //   }

// //   const handleEdit = (meditation) => {
// //     setFormData({
// //       name: meditation.name,
// //       description: meditation.description,
// //       category: meditation.category,
// //       duration: meditation.duration,
// //     })
// //     setEditingId(meditation.id)
// //     setIsAdding(true)
// //   }

// //   const filteredMeditations = meditations.filter((meditation) => {
// //     return filter === "All" || meditation.category === filter
// //   })

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h1 className="text-2xl font-bold">Meditation Management</h1>
// //         <Button
// //           onClick={() => {
// //             setIsAdding(true)
// //             setEditingId(null)
// //             setFormData({
// //               name: "",
// //               description: "",
// //               category: "Mindfulness",
// //               duration: 10,
// //             })
// //           }}
// //           className="bg-[#00A8FF] hover:bg-[#0096E6]">
// //           <Plus className="mr-2 h-4 w-4" /> Add Meditation
// //         </Button>
// //       </div>

// //       {isAdding && (
// //         <Card className="p-6">
// //           <div className="mb-4 flex items-center justify-between">
// //             <h2 className="text-lg font-semibold">{editingId ? "Edit Meditation" : "Add New Meditation"}</h2>
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() => {
// //                 setIsAdding(false)
// //                 setEditingId(null)
// //               }}>
// //               <X className="h-4 w-4" />
// //             </Button>
// //           </div>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label htmlFor="name" className="mb-1 block text-sm font-medium">
// //                 Meditation Name
// //               </label>
// //               <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
// //             </div>
// //             <div>
// //               <label htmlFor="description" className="mb-1 block text-sm font-medium">
// //                 Description
// //               </label>
// //               <Textarea
// //                 id="description"
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleInputChange}
// //                 rows={3}
// //               />
// //             </div>
// //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// //               <div>
// //                 <label htmlFor="category" className="mb-1 block text-sm font-medium">
// //                   Category
// //                 </label>
// //                 <Select id="category" name="category" value={formData.category} onChange={handleInputChange}>
// //                   <option value="Mindfulness">Mindfulness</option>
// //                   <option value="Relaxation">Relaxation</option>
// //                   <option value="Sleep">Sleep</option>
// //                   <option value="Focus">Focus</option>
// //                   <option value="Breathing">Breathing</option>
// //                 </Select>
// //               </div>
// //               <div>
// //                 <label htmlFor="duration" className="mb-1 block text-sm font-medium">
// //                   Duration (minutes)
// //                 </label>
// //                 <Input
// //                   id="duration"
// //                   name="duration"
// //                   type="number"
// //                   min="1"
// //                   value={formData.duration}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex justify-end">
// //               <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
// //                 {editingId ? "Update Meditation" : "Add Meditation"}
// //               </Button>
// //             </div>
// //           </form>
// //         </Card>
// //       )}

// //       <div>
// //         <label htmlFor="categoryFilter" className="mb-1 block text-sm font-medium">
// //           Filter by Category
// //         </label>
// //         <Select
// //           id="categoryFilter"
// //           value={filter}
// //           onChange={(e) => setFilter(e.target.value)}
// //           className="w-full max-w-xs"
// //         >
// //           <option value="All">All Categories</option>
// //           <option value="Mindfulness">Mindfulness</option>
// //           <option value="Relaxation">Relaxation</option>
// //           <option value="Sleep">Sleep</option>
// //           <option value="Focus">Focus</option>
// //           <option value="Breathing">Breathing</option>
// //         </Select>
// //       </div>

// //       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
// //         {filteredMeditations.length > 0 ? (
// //           filteredMeditations.map((meditation) => (
// //             <Card key={meditation.id} className="p-6">
// //               <div className="mb-4 flex items-center">
// //                 <div className="rounded-full bg-purple-100 p-2 text-purple-600">
// //                   <Wind className="h-5 w-5" />
// //                 </div>
// //                 <div className="ml-3">
// //                   <h3 className="font-semibold">{meditation.name}</h3>
// //                   <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// //                     {meditation.category}
// //                   </span>
// //                 </div>
// //                 <div className="ml-auto flex space-x-2">
// //                   <Button variant="ghost" size="icon" onClick={() => handleEdit(meditation)}>
// //                     <Edit className="h-4 w-4" />
// //                   </Button>
// //                   <Button variant="ghost" size="icon" onClick={() => deleteMeditation(meditation.id)}>
// //                     <Trash className="h-4 w-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //               <p className="mb-3 text-sm">{meditation.description}</p>
// //               <div className="flex items-center justify-end">
// //                 <span className="text-sm">{meditation.duration} minutes</span>
// //               </div>
// //             </Card>
// //           ))
// //         ) : (
// //           <p className="col-span-full text-center text-gray-500">No meditations found</p>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }



// "use client"

// import { useState } from "react"
// import { useMeditationStore } from "../store/meditation-store"
// import { Card } from "../components/ui/card"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Textarea } from "../components/ui/textarea"
// import { Select } from "../components/ui/select"
// import { Wind, Edit, Trash, Plus, X } from "lucide-react"

// export function MeditationManagement() {
//   const { meditations, addMeditation, updateMeditation, deleteMeditation } = useMeditationStore()
//   const [isAdding, setIsAdding] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Mindfulness",
//     duration: 10,
//   })
//   const [filter, setFilter] = useState("All")

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: name === "duration" ? Number(value) : value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (editingId) {
//       updateMeditation(editingId, { ...formData })
//       setEditingId(null)
//     } else {
//       addMeditation({
//         ...formData,
//         id: Date.now().toString(),
//         createdAt: Date.now(),
//       })
//     }
//     setIsAdding(false)
//     setFormData({
//       name: "",
//       description: "",
//       category: "Mindfulness",
//       duration: 10,
//     })
//   }

//   const handleEdit = (meditation) => {
//     setFormData({
//       name: meditation.name,
//       description: meditation.description,
//       category: meditation.category,
//       duration: meditation.duration,
//     })
//     setEditingId(meditation.id)
//     setIsAdding(true)
//   }

//   const filteredMeditations = meditations.filter((meditation) => {
//     return filter === "All" || meditation.category === filter
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Meditation Management</h1>
//         <Button
//           onClick={() => {
//             setIsAdding(true)
//             setEditingId(null)
//             setFormData({
//               name: "",
//               description: "",
//               category: "Mindfulness",
//               duration: 10,
//             })
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Meditation
//         </Button>
//       </div>

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">{editingId ? "Edit Meditation" : "Add New Meditation"}</h2>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => {
//                 setIsAdding(false)
//                 setEditingId(null)
//               }}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="mb-1 block text-sm font-medium">
//                 Meditation Name
//               </label>
//               <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
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
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label htmlFor="category" className="mb-1 block text-sm font-medium">
//                   Category
//                 </label>
//                 <Select id="category" name="category" value={formData.category} onChange={handleInputChange}>
//                   <option value="Mindfulness">Mindfulness</option>
//                   <option value="Relaxation">Relaxation</option>
//                   <option value="Sleep">Sleep</option>
//                   <option value="Focus">Focus</option>
//                   <option value="Breathing">Breathing</option>
//                 </Select>
//               </div>
//               <div>
//                 <label htmlFor="duration" className="mb-1 block text-sm font-medium">
//                   Duration (minutes)
//                 </label>
//                 <Input
//                   id="duration"
//                   name="duration"
//                   type="number"
//                   min="1"
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
//                 {editingId ? "Update Meditation" : "Add Meditation"}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       )}

//       <div>
//         <label htmlFor="categoryFilter" className="mb-1 block text-sm font-medium">
//           Filter by Category
//         </label>
//         <Select
//           id="categoryFilter"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="w-full max-w-xs"
//         >
//           <option value="All">All Categories</option>
//           <option value="Mindfulness">Mindfulness</option>
//           <option value="Relaxation">Relaxation</option>
//           <option value="Sleep">Sleep</option>
//           <option value="Focus">Focus</option>
//           <option value="Breathing">Breathing</option>
//         </Select>
//       </div>

//       {/* Meditation List */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredMeditations.length > 0 ? (
//           filteredMeditations.map((meditation) => (
//             <Card key={meditation.id} className="p-6">
//               <div className="mb-4 flex items-center">
//                 <div className="rounded-full bg-purple-100 p-2 text-purple-600">
//                   <Wind className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-semibold">{meditation.name}</h3>
//                   <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
//                     {meditation.category}
//                   </span>
//                 </div>
//                 <div className="ml-auto flex space-x-2">
//                   <Button variant="ghost" size="icon" onClick={() => handleEdit(meditation)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => deleteMeditation(meditation.id)}>
//                     <Trash className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//               <p className="mb-3 text-sm">{meditation.description}</p>
//               <div className="flex items-center justify-end">
//                 <span className="text-sm">{meditation.duration} minutes</span>
//               </div>
//             </Card>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No meditations found</p>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { useMeditationStore } from "../store/meditation-store"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select } from "../components/ui/select"
import { Wind, Edit, Trash, Plus, X } from "lucide-react"

export function MeditationManagement() {
  const { meditations, addMeditation, updateMeditation, deleteMeditation } = useMeditationStore()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Mindfulness",
    duration: 10,
  })
  const [filter, setFilter] = useState("All")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "duration" ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateMeditation(editingId, { ...formData })
      setEditingId(null)
    } else {
      addMeditation({
        ...formData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      })
    }
    setIsAdding(false)
    setFormData({
      name: "",
      description: "",
      category: "Mindfulness",
      duration: 10,
    })
  }

  const handleEdit = (meditation) => {
    setFormData({
      name: meditation.name,
      description: meditation.description,
      category: meditation.category,
      duration: meditation.duration,
    })
    setEditingId(meditation.id)
    setIsAdding(true)
  }

  const filteredMeditations = meditations.filter((meditation) => filter === "All" || meditation.category === filter)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meditation Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingId(null)
            setFormData({
              name: "",
              description: "",
              category: "Mindfulness",
              duration: 10,
            })
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Meditation
        </Button>
      </div>

      {/* Meditation Form */}
      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Meditation" : "Add New Meditation"}</h2>
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
              <label htmlFor="name" className="mb-1 block text-sm font-medium">Meditation Name</label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium">Description</label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="mb-1 block text-sm font-medium">Category</label>
                <Select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Focus">Focus</option>
                  <option value="Breathing">Breathing</option>
                </Select>
              </div>
              <div>
                <label htmlFor="duration" className="mb-1 block text-sm font-medium">Duration (minutes)</label>
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
                {editingId ? "Update Meditation" : "Add Meditation"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Category Filter */}
      <div>
        <label htmlFor="categoryFilter" className="mb-1 block text-sm font-medium">Filter by Category</label>
        <Select
          id="categoryFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-xs"
        >
          <option value="All">All Categories</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Relaxation">Relaxation</option>
          <option value="Sleep">Sleep</option>
          <option value="Focus">Focus</option>
          <option value="Breathing">Breathing</option>
        </Select>
      </div>

      {/* Meditation List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeditations.length > 0 ? (
          filteredMeditations.map((meditation) => (
            <Card key={meditation.id} className="p-6">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                  <Wind className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{meditation.name}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{meditation.category}</span>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(meditation)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMeditation(meditation.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mb-3 text-sm">{meditation.description}</p>
              <div className="flex items-center justify-end">
                <span className="text-sm">{meditation.duration} minutes</span>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No meditations found</p>
        )}
      </div>
    </div>
  )
}
