// // "use client";

// // import { useState, useEffect } from "react";
// // import { useWorkoutStore } from "../store/workout-store";
// // import { useNavigate } from "react-router-dom";
// // import { Card } from "../components/ui/card";
// // import { Button } from "../components/ui/button";
// // import { Input } from "../components/ui/input";
// // import { Textarea } from "../components/ui/textarea";
// // import { Label } from "../components/ui/label";
// // import { Plus, Trash, Edit, X } from "lucide-react";

// // export function WorkoutManagement() {
// //   const navigate = useNavigate();
// //   const trainer = JSON.parse(localStorage.getItem("trainer"));
// //   const trainerId = trainer?._id;

// //   const {
// //     workouts,
// //     loading: workoutLoading,
// //     error,
// //     fetchWorkouts,
// //     addWorkout,
// //     updateWorkout,
// //     deleteWorkout,
// //   } = useWorkoutStore();

// //   const [isAdding, setIsAdding] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [previewThumbnail, setPreviewThumbnail] = useState(null);
// //   const [formData, setFormData] = useState(() => {
// //     const saved = localStorage.getItem("draftWorkoutForm");
// //     return saved
// //       ? JSON.parse(saved)
// //       : {
// //           title: "",
// //           description: "",
// //           difficulty: "Easy",
// //           duration: 30,
// //           aim: "strength",
// //           calorie: 20,
// //           time: 0,
// //           videoFile: null,
// //           thumbnail: null,
// //           sections: [],
// //         };
// //   });

// //   // Save draft on changes
// //   useEffect(() => {
// //     localStorage.setItem("draftWorkoutForm", JSON.stringify(formData));
// //   }, [formData]);

// //   useEffect(() => {
// //     if (trainerId) {
// //       fetchWorkouts();
// //     }
// //   }, [trainerId]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFileChange = (e, field) => {
// //     const file = e.target.files[0];
// //     setFormData((prev) => ({ ...prev, [field]: file }));

// //     if (field === "thumbnail" && file) {
// //       const reader = new FileReader();
// //       reader.onload = (event) => setPreviewThumbnail(event.target.result);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSectionChange = (index, field, value) => {
// //     const updatedSections = [...formData.sections];
// //     updatedSections[index][field] = value;
// //     setFormData((prev) => ({ ...prev, sections: updatedSections }));
// //   };

// //   const handleExerciseChange = (sectionIndex, exerciseIndex, field, value) => {
// //     const updatedSections = [...formData.sections];
// //     updatedSections[sectionIndex].exercises[exerciseIndex][field] = value;
// //     setFormData((prev) => ({ ...prev, sections: updatedSections }));
// //   };

// //   const addSection = () => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       sections: [...prev.sections, { title: "", description: "", exercises: [] }]
// //     }));
// //   };

// //   const addExercise = (sectionIndex) => {
// //     const updatedSections = [...formData.sections];
// //     updatedSections[sectionIndex].exercises.push({ name: "", duration: "", thumbnail: "" });
// //     setFormData((prev) => ({ ...prev, sections: updatedSections }));
// //   };

// //   const removeSection = (index) => {
// //     const updatedSections = [...formData.sections];
// //     updatedSections.splice(index, 1);
// //     setFormData((prev) => ({ ...prev, sections: updatedSections }));
// //   };

// //   const removeExercise = (sectionIndex, exerciseIndex) => {
// //     const updatedSections = [...formData.sections];
// //     updatedSections[sectionIndex].exercises.splice(exerciseIndex, 1);
// //     setFormData((prev) => ({ ...prev, sections: updatedSections }));
// //   };

// //   const resetForm = () => {
// //     setIsAdding(false);
// //     setEditingId(null);
// //     setPreviewThumbnail(null);
// //     setFormData({
// //       title: "",
// //       description: "",
// //       difficulty: "Easy",
// //       duration: 30,
// //       aim: "strength",
// //       calorie: 20,
// //       time: 0,
// //       videoFile: null,
// //       thumbnail: null,
// //       sections: [],
// //     });
// //     localStorage.removeItem("draftWorkoutForm");
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!trainerId) return alert("Trainer not logged in");

// //     const workoutData = new FormData();
// //     workoutData.append("title", formData.title);
// //     workoutData.append("description", formData.description);
// //     workoutData.append("difficulty", formData.difficulty);
// //     workoutData.append("duration", formData.duration);
// //     workoutData.append("aim", formData.aim);
// //     workoutData.append("calorie", formData.calorie);
// //     workoutData.append("time", formData.time);
// //     workoutData.append("trainer", trainerId);

// //     if (formData.videoFile) workoutData.append("video", formData.videoFile);
// //     if (formData.thumbnail) workoutData.append("thumbnail", formData.thumbnail);
// //     workoutData.append("sections", JSON.stringify(formData.sections));

// //     try {
// //       if (editingId) {
// //         await updateWorkout(editingId, workoutData);
// //       } else {
// //         await addWorkout(workoutData);
// //       }
// //       resetForm();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (!trainerId) {
// //     return (
// //       <div className="h-screen flex flex-col justify-center items-center">
// //         <h1 className="text-xl font-bold">Access Denied</h1>
// //         <Button onClick={() => navigate("/trainer/login")}>Go to Trainer Login</Button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-2xl font-bold">Manage Workouts</h1>
// //         <Button onClick={() => { setIsAdding(true); resetForm(); }}><Plus className="mr-2" />Add Workout</Button>
// //       </div>

// //       {isAdding && (
// //         <Card className="p-6 space-y-6">
// //           <div className="flex justify-between items-center">
// //             <h2 className="text-lg font-semibold">{editingId ? "Edit Workout" : "New Workout"}</h2>
// //             <Button variant="ghost" onClick={resetForm}><X /></Button>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <Input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
// //               <Input name="duration" placeholder="Duration (min)" type="number" value={formData.duration} onChange={handleInputChange} required />
// //             </div>
// //             <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />

// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <Input name="calorie" placeholder="Calories Burn" type="number" value={formData.calorie} onChange={handleInputChange} />
// //               <Input name="time" placeholder="Workout Time (hours)" type="number" value={formData.time} onChange={handleInputChange} />
// //             </div>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <Input type="file" onChange={(e) => handleFileChange(e, "videoFile")} accept="video/*" />
// //               <div>
// //                 <Input type="file" onChange={(e) => handleFileChange(e, "thumbnail")} accept="image/*" />
// //                 {previewThumbnail && (
// //                   <img src={previewThumbnail} alt="Preview" className="w-24 h-24 object-cover rounded mt-2" />
// //                 )}
// //               </div>
// //             </div>

// //             {/* Sections */}
// //             <div className="space-y-4">
// //               {formData.sections.map((section, sectionIdx) => (
// //                 <div key={sectionIdx} className="p-4 bg-gray-100 rounded-md space-y-4">
// //                   <div className="flex justify-between items-center">
// //                     <h3 className="text-lg font-semibold">Section {sectionIdx + 1}</h3>
// //                     <Button variant="destructive" onClick={() => removeSection(sectionIdx)}><Trash /></Button>
// //                   </div>

// //                   <Input placeholder="Section Title" value={section.title} onChange={(e) => handleSectionChange(sectionIdx, "title", e.target.value)} />
// //                   <Textarea placeholder="Section Description" value={section.description} onChange={(e) => handleSectionChange(sectionIdx, "description", e.target.value)} />

// //                   {/* Exercises */}
// //                   {section.exercises.map((exercise, exerciseIdx) => (
// //                     <div key={exerciseIdx} className="space-y-2">
// //                       <Input placeholder="Exercise Name" value={exercise.name} onChange={(e) => handleExerciseChange(sectionIdx, exerciseIdx, "name", e.target.value)} />
// //                       <Input placeholder="Duration (e.g., 00:30)" value={exercise.duration} onChange={(e) => handleExerciseChange(sectionIdx, exerciseIdx, "duration", e.target.value)} />
// //                       <Input placeholder="Exercise Thumbnail URL" value={exercise.thumbnail} onChange={(e) => handleExerciseChange(sectionIdx, exerciseIdx, "thumbnail", e.target.value)} />
// //                       <Button size="sm" variant="destructive" onClick={() => removeExercise(sectionIdx, exerciseIdx)}>Remove Exercise</Button>
// //                     </div>
// //                   ))}

// //                   <Button size="sm" onClick={() => addExercise(sectionIdx)}>Add Exercise</Button>
// //                 </div>
// //               ))}
// //               <Button variant="secondary" onClick={addSection}>Add Section</Button>
// //             </div>

// //             <div className="flex justify-end">
// //               <Button type="submit" disabled={workoutLoading}>{editingId ? "Update" : "Create"}</Button>
// //             </div>
// //           </form>
// //         </Card>
// //       )}

// //       {/* Workout List */}
// //       {!isAdding && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {workouts.length > 0 ? (
// //             workouts.map((workout) => (
// //               <Card key={workout._id} className="p-6">
// //                 <h3 className="text-lg font-bold mb-2">{workout.title}</h3>
// //                 <p className="text-gray-600 mb-2">{workout.description}</p>
// //                 <div className="flex justify-end gap-2">
// //                   <Button variant="outline" onClick={() => { setIsAdding(true); setEditingId(workout._id); setFormData({...workout, sections: workout.sections || []}) }}>
// //                     <Edit className="mr-2" />Edit
// //                   </Button>
// //                   <Button variant="destructive" onClick={() => deleteWorkout(workout._id)}>
// //                     <Trash className="mr-2" />Delete
// //                   </Button>
// //                 </div>
// //               </Card>
// //             ))
// //           ) : (
// //             <p className="text-center">No workouts created yet.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useWorkoutStore } from "../store/workout-store";
// import { useNavigate } from "react-router-dom";
// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Label } from "../components/ui/label";
// import { Plus, Trash, Edit, X } from "lucide-react";

// export function WorkoutManagement() {
//   const navigate = useNavigate();
//   const trainer = JSON.parse(localStorage.getItem("trainer"));
//   const trainerId = trainer?._id;

//   const {
//     workouts,
//     loading: workoutLoading,
//     error,
//     fetchWorkouts,
//     addWorkout,
//     updateWorkout,
//     deleteWorkout,
//   } = useWorkoutStore();

//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [previewThumbnail, setPreviewThumbnail] = useState(null);
//   const [formData, setFormData] = useState(() => {
//     const saved = localStorage.getItem("draftWorkoutForm");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           title: "",
//           description: "",
//           difficulty: "Easy",
//           duration: 30,
//           aim: "strength",
//           calorie: 20,
//           time: 0,
//           videoFile: null,
//           thumbnail: null,
//           sections: [],
//         };
//   });

//   useEffect(() => {
//     localStorage.setItem("draftWorkoutForm", JSON.stringify(formData));
//   }, [formData]);

//   useEffect(() => {
//     if (trainerId) {
//       fetchWorkouts();
//     }
//   }, [trainerId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, [field]: file }));

//     if (field === "thumbnail" && file) {
//       const reader = new FileReader();
//       reader.onload = (event) => setPreviewThumbnail(event.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSectionChange = (index, field, value) => {
//     const updatedSections = [...formData.sections];
//     updatedSections[index][field] = value;
//     setFormData((prev) => ({ ...prev, sections: updatedSections }));
//   };

//   const handleExerciseChange = (sectionIndex, exerciseIndex, field, value) => {
//     const updatedSections = [...formData.sections];
//     updatedSections[sectionIndex].exercises[exerciseIndex][field] = value;
//     setFormData((prev) => ({ ...prev, sections: updatedSections }));
//   };

//   const addSection = () => {
//     setFormData((prev) => ({
//       ...prev,
//       sections: [...prev.sections, { title: "", description: "", exercises: [] }]
//     }));
//   };

//   const addExercise = (sectionIndex) => {
//     const updatedSections = [...formData.sections];
//     updatedSections[sectionIndex].exercises.push({ name: "", duration: "", thumbnail: "" });
//     setFormData((prev) => ({ ...prev, sections: updatedSections }));
//   };

//   const removeSection = (index) => {
//     const updatedSections = [...formData.sections];
//     updatedSections.splice(index, 1);
//     setFormData((prev) => ({ ...prev, sections: updatedSections }));
//   };

//   const removeExercise = (sectionIndex, exerciseIndex) => {
//     const updatedSections = [...formData.sections];
//     updatedSections[sectionIndex].exercises.splice(exerciseIndex, 1);
//     setFormData((prev) => ({ ...prev, sections: updatedSections }));
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setPreviewThumbnail(null);
//     setFormData({
//       title: "",
//       description: "",
//       difficulty: "Easy",
//       duration: 30,
//       aim: "strength",
//       calorie: 20,
//       time: 0,
//       videoFile: null,
//       thumbnail: null,
//       sections: [],
//     });
//     localStorage.removeItem("draftWorkoutForm");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!trainerId) return alert("Trainer not logged in");

//     const workoutData = new FormData();
//     workoutData.append("title", formData.title);
//     workoutData.append("description", formData.description);
//     workoutData.append("difficulty", formData.difficulty);
//     workoutData.append("duration", formData.duration);
//     workoutData.append("aim", formData.aim);
//     workoutData.append("calorie", formData.calorie);
//     workoutData.append("time", formData.time);
//     workoutData.append("trainer", trainerId);

//     if (formData.videoFile) workoutData.append("video", formData.videoFile);
//     if (formData.thumbnail) workoutData.append("thumbnail", formData.thumbnail);
//     workoutData.append("sections", JSON.stringify(formData.sections));

//     try {
//       if (editingId) {
//         await updateWorkout(editingId, workoutData);
//       } else {
//         await addWorkout(workoutData);
//       }
//       setIsAdding(false); // ✅ After submit, hide form
//       resetForm();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!trainerId) {
//     return (
//       <div className="h-screen flex flex-col justify-center items-center">
//         <h1 className="text-xl font-bold">Access Denied</h1>
//         <Button onClick={() => navigate("/trainer/login")}>Go to Trainer Login</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Manage Workouts</h1>
//         <Button onClick={() => { resetForm(); setIsAdding(true); }}>
//           <Plus className="mr-2" /> Add Workout
//         </Button>
//       </div>

//       {isAdding && (
//         <Card className="p-6 space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">{editingId ? "Edit Workout" : "New Workout"}</h2>
//             <Button variant="ghost" onClick={() => setIsAdding(false)}><X /></Button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Form fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
//               <Input name="duration" placeholder="Duration (min)" type="number" value={formData.duration} onChange={handleInputChange} required />
//             </div>
//             <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input name="calorie" placeholder="Calories Burn" type="number" value={formData.calorie} onChange={handleInputChange} />
//               <Input name="time" placeholder="Workout Time (hours)" type="number" value={formData.time} onChange={handleInputChange} />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input type="file" onChange={(e) => handleFileChange(e, "videoFile")} accept="video/*" />
//               <div>
//                 <Input type="file" onChange={(e) => handleFileChange(e, "thumbnail")} accept="image/*" />
//                 {previewThumbnail && (
//                   <img src={previewThumbnail} alt="Preview" className="w-24 h-24 object-cover rounded mt-2" />
//                 )}
//               </div>
//             </div>

//             {/* Sections and Exercises */}
//             <div className="space-y-4">
//               {formData.sections.map((section, sectionIdx) => (
//                 <div key={sectionIdx} className="p-4 bg-gray-100 rounded-md space-y-4">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold">Section {sectionIdx + 1}</h3>
//                     <Button variant="destructive" onClick={() => removeSection(sectionIdx)}><Trash /></Button>
//                   </div>

//                   <Input placeholder="Section Title" value={section.title} onChange={(e) => handleSectionChange(sectionIdx, "title", e.target.value)} />
//                   <Textarea placeholder="Section Description" value={section.description} onChange={(e) => handleSectionChange(sectionIdx, "description", e.target.value)} />

//                   {section.exercises.map((exercise, exerciseIdx) => (
//                     <div key={exerciseIdx} className="space-y-2">
//                       <Input placeholder="Exercise Name" value={exercise.name} onChange={(e) => handleExerciseChange(sectionIdx, exerciseIdx, "name", e.target.value)} />
//                       <Input placeholder="Duration (e.g., 00:30)" value={exercise.duration} onChange={(e) => handleExerciseChange(sectionIdx, exerciseIdx, "duration", e.target.value)} />
//                       <Input placeholder="Exercise Thumbnail URL" value={exercise.thumbnail} onChange={(e) => handleExerciseChange(sectionIdx, exerciseIdx, "thumbnail", e.target.value)} />
//                       <Button size="sm" variant="destructive" onClick={() => removeExercise(sectionIdx, exerciseIdx)}>Remove Exercise</Button>
//                     </div>
//                   ))}
//                   <Button size="sm" onClick={() => addExercise(sectionIdx)}>Add Exercise</Button>
//                 </div>
//               ))}
//               <Button variant="secondary" onClick={addSection}>Add Section</Button>
//             </div>

//             <div className="flex justify-end">
//               <Button type="submit" disabled={workoutLoading}>{editingId ? "Update" : "Create"}</Button>
//             </div>
//           </form>
//         </Card>
//       )}

//       {/* Workout List */}
//       {!isAdding && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {workouts.length > 0 ? (
//             workouts.map((workout) => (
//               <Card key={workout._id} className="p-6">
//                 <h3 className="text-lg font-bold mb-2">{workout.title}</h3>
//                 <p className="text-gray-600 mb-2">{workout.description}</p>
//                 <div className="flex justify-end gap-2">
//                   <Button variant="outline" onClick={() => { resetForm(); setIsAdding(true); setEditingId(workout._id); setFormData({...workout, sections: workout.sections || []}) }}>
//                     <Edit className="mr-2" />Edit
//                   </Button>
//                   <Button variant="destructive" onClick={() => deleteWorkout(workout._id)}>
//                     <Trash className="mr-2" />Delete
//                   </Button>
//                 </div>
//               </Card>
//             ))
//           ) : (
//             <p className="text-center">No workouts created yet.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useWorkoutStore } from "../store/workout-store";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Plus, Trash, Edit, X } from "lucide-react";

export function WorkoutManagement() {
  const navigate = useNavigate();
  const trainer = JSON.parse(localStorage.getItem("trainer"));
  const trainerId = trainer?._id;

  const {
    workouts,
    loading: workoutLoading,
    error,
    fetchWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
  } = useWorkoutStore();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("draftWorkoutForm");
    return saved
      ? JSON.parse(saved)
      : {
          title: "",
          description: "",
          difficulty: "Easy",
          duration: 30,
          aim: "strength",
          calorie: 20,
          time: 0,
          videoFile: null,
          thumbnail: null,
          sections: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("draftWorkoutForm", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (trainerId) {
      fetchWorkouts();
    }
  }, [trainerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));

    if (field === "thumbnail" && file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreviewThumbnail(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const handleExerciseChange = (sectionIndex, exerciseIndex, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].exercises[exerciseIndex][field] = value;
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", description: "", exercises: [] }]
    }));
  };

  const addExercise = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].exercises.push({ name: "", duration: "", thumbnail: "" });
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const removeSection = (index) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const removeExercise = (sectionIndex, exerciseIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].exercises.splice(exerciseIndex, 1);
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const resetForm = () => {
    setEditingId(null);
    setPreviewThumbnail(null);
    setFormData({
      title: "",
      description: "",
      difficulty: "Easy",
      duration: 30,
      aim: "strength",
      calorie: 20,
      time: 0,
      videoFile: null,
      thumbnail: null,
      sections: [],
    });
    localStorage.removeItem("draftWorkoutForm");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trainerId) return alert("Trainer not logged in");

    const workoutData = new FormData();
    workoutData.append("title", formData.title);
    workoutData.append("description", formData.description);
    workoutData.append("difficulty", formData.difficulty);
    workoutData.append("duration", formData.duration);
    workoutData.append("aim", formData.aim);
    workoutData.append("calorie", formData.calorie);
    workoutData.append("time", formData.time);
    workoutData.append("trainer", trainerId);

    if (formData.videoFile) workoutData.append("video", formData.videoFile);
    if (formData.thumbnail) workoutData.append("thumbnail", formData.thumbnail);
    workoutData.append("sections", JSON.stringify(formData.sections));

    try {
      if (editingId) {
        await updateWorkout(editingId, workoutData);
      } else {
        await addWorkout(workoutData);
      }
      setIsAdding(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  if (!trainerId) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <Button onClick={() => navigate("/trainer/login")}>Go to Trainer Login</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Workouts</h1>
        <Button onClick={() => { resetForm(); setIsAdding(true); }}>
          <Plus className="mr-2" /> Add Workout
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Workout" : "New Workout"}</h2>
            <Button variant="ghost" onClick={() => setIsAdding(false)}><X /></Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Workout Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="duration">Duration (Minutes)</Label>
                <Input id="duration" name="duration" type="number" value={formData.duration} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Workout Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="calorie">Calories Burned</Label>
                <Input id="calorie" name="calorie" type="number" value={formData.calorie} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="time">Workout Time (Hours)</Label>
                <Input id="time" name="time" type="number" value={formData.time} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="video">Workout Video Upload</Label>
                <Input id="video" type="file" onChange={(e) => handleFileChange(e, "videoFile")} accept="video/*" />
              </div>
              <div>
                <Label htmlFor="thumbnail">Workout Thumbnail Upload</Label>
                <Input id="thumbnail" type="file" onChange={(e) => handleFileChange(e, "thumbnail")} accept="image/*" />
                {previewThumbnail && (
                  <img src={previewThumbnail} alt="Thumbnail Preview" className="w-24 h-24 object-cover rounded mt-2" />
                )}
              </div>
            </div>

            {/* Sections & Exercises */}
            <div className="space-y-6">
              {formData.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Section {sectionIdx + 1}</h3>
                    <Button variant="destructive" onClick={() => removeSection(sectionIdx)}>Remove</Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input value={section.title} onChange={(e) => handleSectionChange(sectionIdx, "title", e.target.value)} />

                    <Label>Section Description</Label>
                    <Textarea value={section.description} onChange={(e) => handleSectionChange(sectionIdx, "description", e.target.value)} />

                    {section.exercises.map((exercise, exIdx) => (
                      <div key={exIdx} className="space-y-2">
                        <Label>Exercise Name</Label>
                        <Input value={exercise.name} onChange={(e) => handleExerciseChange(sectionIdx, exIdx, "name", e.target.value)} />

                        <Label>Exercise Duration</Label>
                        <Input value={exercise.duration} onChange={(e) => handleExerciseChange(sectionIdx, exIdx, "duration", e.target.value)} />

                        <Label>Exercise Thumbnail URL</Label>
                        <Input value={exercise.thumbnail} onChange={(e) => handleExerciseChange(sectionIdx, exIdx, "thumbnail", e.target.value)} />

                        <Button variant="destructive" size="sm" onClick={() => removeExercise(sectionIdx, exIdx)}>Remove Exercise</Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={() => addExercise(sectionIdx)}>Add Exercise</Button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={addSection}>Add Section</Button>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={workoutLoading}>{editingId ? "Update Workout" : "Create Workout"}</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Workouts */}
      {!isAdding && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <Card key={workout._id} className="p-6">
                <h3 className="text-lg font-bold mb-2">{workout.title}</h3>
                <p className="text-gray-600 mb-4">{workout.description}</p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { resetForm(); setIsAdding(true); setEditingId(workout._id); setFormData({...workout, sections: workout.sections || []}) }}>
                    <Edit className="mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => deleteWorkout(workout._id)}>
                    <Trash className="mr-2" /> Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No workouts created yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
