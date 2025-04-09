// import { useState, useEffect } from "react"
// import { useWorkoutStore } from "../store/workout-store"
// import { Card } from "../components/ui/card"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Textarea } from "../components/ui/textarea"
// import { Label } from "../components/ui/label"
// import { Dumbbell, Edit, Trash, Plus, X } from "lucide-react"

// export function WorkoutManagement() {
//   const [isAdding, setIsAdding] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     difficulty: "Easy",
//     duration: 30,
//     videoFile: null,
//     time: 0,
//     aim: "strength",
//     thumbnail: null,
//   })

//   const workouts = useWorkoutStore((state) => state.workouts || [])
//   const fetchWorkouts = useWorkoutStore((state) => state.fetchWorkouts)
//   const addWorkout = useWorkoutStore((state) => state.addWorkout)
//   const updateWorkout = useWorkoutStore((state) => state.updateWorkout)
//   const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout)

//   useEffect(() => {
//     fetchWorkouts()
//   }, [fetchWorkouts])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFileUpload = async (file, type = "image") => {
//     console.log(`File to upload (${type}):`, file)
//     return type === "image" ? "thumbnail-placeholder-url.jpg" : "video-placeholder-url.mp4"
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const workoutData = { ...formData }

//     if (workoutData.thumbnail instanceof File) {
//       workoutData.thumbnail = await handleFileUpload(workoutData.thumbnail, "image")
//     }

//     if (workoutData.videoFile instanceof File) {
//       workoutData.videoUrl = await handleFileUpload(workoutData.videoFile, "video")
//       delete workoutData.videoFile
//     }

//     if (editingId) {
//       await updateWorkout(editingId, workoutData)
//     } else {
//       await addWorkout(workoutData)
//     }

//     setIsAdding(false)
//     setFormData({
//       title: "",
//       description: "",
//       difficulty: "Easy",
//       duration: 30,
//       videoFile: null,
//       time: 0,
//       aim: "strength",
//       thumbnail: null,
//     })
//   }

//   const handleEdit = (workout) => {
//     setIsAdding(true)
//     setEditingId(workout.id)
//     setFormData({
//       title: workout.title || "",
//       description: workout.description || "",
//       difficulty: workout.difficulty || "Easy",
//       duration: workout.duration || 30,
//       videoFile: null,
//       time: workout.time || 0,
//       aim: workout.aim || "strength",
//       thumbnail: workout.thumbnail || null,
//     })
//   }

//   const filteredWorkouts = Array.isArray(workouts) ? workouts : []

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Workout Management</h1>
//         <Button
//           onClick={() => {
//             setIsAdding(true)
//             setEditingId(null)
//             setFormData({
//               title: "",
//               description: "",
//               difficulty: "Easy",
//               duration: 30,
//               videoFile: null,
//               time: 0,
//               aim: "strength",
//               thumbnail: null,
//             })
//           }}
//           className="bg-[#00A8FF] hover:bg-[#0096E6]"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Workout
//         </Button>
//       </div>

//       {isAdding && (
//         <Card className="p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-lg font-semibold">{editingId ? "Edit Workout" : "Add New Workout"}</h2>
//             <Button variant="ghost" size="icon" onClick={() => {
//               setIsAdding(false)
//               setEditingId(null)
//             }}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
//               <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
//             </div>

//             <div>
//               <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
//               <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} required />
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="difficulty">Difficulty</Label>
//                 <select
//                   id="difficulty"
//                   name="difficulty"
//                   value={formData.difficulty}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="Easy">Easy</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Hard">Hard</option>
//                 </select>
//               </div>

//               <div>
//                 <Label htmlFor="duration">Duration (minutes)</Label>
//                 <Input id="duration" name="duration" type="number" min="1" value={formData.duration} onChange={handleInputChange} required />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="videoFile">Video Upload</Label>
//                 <Input
//                   id="videoFile"
//                   name="videoFile"
//                   type="file"
//                   accept="video/*"
//                   onChange={(e) => setFormData((prev) => ({ ...prev, videoFile: e.target.files[0] }))}
//                 />
//                 {formData.videoFile && <p className="text-xs text-muted-foreground">Selected: {formData.videoFile.name}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="time">Time (minutes)</Label>
//                 <Input id="time" name="time" type="number" min="0" value={formData.time} onChange={handleInputChange} />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <Label htmlFor="aim">Aim</Label>
//                 <select
//                   id="aim"
//                   name="aim"
//                   value={formData.aim}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="strength">Strength</option>
//                   <option value="cardio">Cardio</option>
//                   <option value="flexibility">Flexibility</option>
//                 </select>
//               </div>

//               <div>
//                 <Label htmlFor="thumbnail">Thumbnail</Label>
//                 <Input
//                   id="thumbnail"
//                   name="thumbnail"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }))}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button type="submit" className="bg-[#00A8FF] hover:bg-[#0096E6]">
//                 {editingId ? "Update Workout" : "Add Workout"}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredWorkouts.length > 0 ? (
//           filteredWorkouts.map((workout) => (
//             <div key={workout.id} className="p-6 border rounded-md shadow-sm">
//               <div className="mb-4 flex items-center">
//                 <div className="rounded-full bg-blue-100 p-2 text-blue-600">
//                   <Dumbbell className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-semibold">{workout.title}</h3>
//                   <p className="text-sm text-gray-500">{workout.aim}</p>
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
//                 <span className="text-sm text-gray-600">{workout.duration} min</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No workouts available.</p>
//         )}
//       </div>
//     </div>
//   )
// }



import { useState, useEffect } from "react";
import { useWorkoutStore } from "../store/workout-store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Dumbbell, Edit, Trash, Plus, X } from "lucide-react";

export function WorkoutManagement() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    duration: 30,
    videoFile: null,
    time: 0,
    aim: "strength",
    thumbnail: null,
  });

  const { 
    workouts, 
    loading, 
    error,
    fetchWorkouts, 
    addWorkout, 
    updateWorkout, 
    deleteWorkout 
  } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const workoutData = new FormData();
      
      // Append all required fields
      workoutData.append("title", formData.title);
      workoutData.append("description", formData.description);
      workoutData.append("difficulty", formData.difficulty);
      workoutData.append("duration", formData.duration.toString()); // Ensure it's a string
      workoutData.append("aim", formData.aim);
      
      // Append optional fields if they exist
      if (formData.time) {
        workoutData.append("time", formData.time.toString());
      }
      
      // Append files if they exist
      if (formData.videoFile) {
        workoutData.append("video", formData.videoFile);
      }
      
      if (formData.thumbnail) {
        workoutData.append("thumbnail", formData.thumbnail);
      }
  
      if (editingId) {
        await updateWorkout(editingId, workoutData);
      } else {
        await addWorkout(workoutData);
      }
  
      setIsAdding(false);
      setFormData({
        title: "",
        description: "",
        difficulty: "Easy",
        duration: 30,
        videoFile: null,
        time: 0,
        aim: "strength",
        thumbnail: null,
      });
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  const handleEdit = (workout) => {
    setIsAdding(true);
    setEditingId(workout._id);
    setFormData({
      title: workout.title || "",
      description: workout.description || "",
      difficulty: workout.difficulty || "Easy",
      duration: workout.duration || 30,
      videoFile: null,
      time: workout.time || 0,
      aim: workout.aim || "strength",
      thumbnail: null, // Reset thumbnail for edit (or fetch existing if needed)
    });
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      difficulty: "Easy",
      duration: 30,
      videoFile: null,
      time: 0,
      aim: "strength",
      thumbnail: null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workout Management</h1>
        <Button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setFormData({
              title: "",
              description: "",
              difficulty: "Easy",
              duration: 30,
              videoFile: null,
              time: 0,
              aim: "strength",
              thumbnail: null,
            });
          }}
          className="bg-[#00A8FF] hover:bg-[#0096E6]"
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Workout
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {isAdding && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Workout" : "Add New Workout"}
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={resetForm}
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  disabled={loading}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="videoFile">Video Upload</Label>
                <Input
                  id="videoFile"
                  name="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "videoFile")}
                  disabled={loading}
                />
                {formData.videoFile && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {formData.videoFile.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="time">Time (minutes)</Label>
                <Input
                  id="time"
                  name="time"
                  type="number"
                  min="0"
                  value={formData.time}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="aim">Aim</Label>
                <select
                  id="aim"
                  name="aim"
                  value={formData.aim}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  disabled={loading}
                >
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                </select>
              </div>

              <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-[#00A8FF] hover:bg-[#0096E6]"
                disabled={loading}
              >
                {loading ? "Processing..." : editingId ? "Update Workout" : "Add Workout"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {loading && !isAdding ? (
        <div className="flex justify-center">
          <p>Loading workouts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <div key={workout._id} className="p-6 border rounded-md shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{workout.title}</h3>
                    <p className="text-sm text-gray-500">{workout.aim}</p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <button 
                      onClick={() => handleEdit(workout)} 
                      className="text-blue-600"
                      disabled={loading}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteWorkout(workout._id)} 
                      className="text-red-600"
                      disabled={loading}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mb-3 text-sm">{workout.description}</p>
                {workout.thumbnail && (
                  <img 
                    src={workout.thumbnail} 
                    alt={workout.title} 
                    className="mb-3 h-32 w-full object-cover rounded-md"
                  />
                )}
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
                  <span className="text-sm text-gray-600">
                    {workout.duration} min
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No workouts available.</p>
          )}
        </div>
      )}
    </div>
  );
}