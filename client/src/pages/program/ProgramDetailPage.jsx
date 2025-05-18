// // // // import { useEffect, useState } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import toast from "react-hot-toast";

// // // // const ProgramDetailPage = () => {
// // // //   const { id } = useParams();
// // // //   const [program, setProgram] = useState(null);
// // // //   const [progress, setProgress] = useState([]);
// // // //   const [enrolled, setEnrolled] = useState(false);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchProgram = async () => {
// // // //       try {
// // // //         const res = await fetch(`http://localhost:8000/api/programs/${id}`);
// // // //         const data = await res.json();
// // // //         if (data.success) setProgram(data.program);
// // // //       } catch (error) {
// // // //         toast.error("Failed to load program");
// // // //       }
// // // //     };

// // // //     const fetchProgress = async () => {
// // // //       try {
// // // //         const res = await fetch(`http://localhost:8000/api/programs/${id}/progress`, {
// // // //           credentials: "include",
// // // //         });
// // // //         const data = await res.json();
// // // //         if (data.success) {
// // // //           setEnrolled(true);
// // // //           setProgress(data.progress.completed || []);
// // // //         }
// // // //       } catch (error) {
// // // //         setEnrolled(false);
// // // //       }
// // // //     };

// // // //     fetchProgram();
// // // //     fetchProgress();
// // // //     setLoading(false);
// // // //   }, [id]);

// // // //   const handleEnroll = async () => {
// // // //     try {
// // // //       const res = await fetch(`http://localhost:8000/api/programs/${id}/enroll`, {
// // // //         method: "POST",
// // // //         credentials: "include",
// // // //       });
// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         toast.success("Enrolled in program!");
// // // //         setEnrolled(true);
// // // //       } else {
// // // //         toast.error(data.message);
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Enrollment failed");
// // // //     }
// // // //   };

// // // //   const markComplete = async (dayIndex, type) => {
// // // //     try {
// // // //       const res = await fetch(`http://localhost:8000/api/programs/${id}/complete`, {
// // // //         method: "PATCH",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         credentials: "include",
// // // //         body: JSON.stringify({ day: dayIndex, type }),
// // // //       });
// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         toast.success("Marked as complete!");
// // // //         setProgress((prev) => [...prev, { day: dayIndex, type }]);
// // // //       }
// // // //     } catch {
// // // //       toast.error("Failed to update progress");
// // // //     }
// // // //   };

// // // //   const isComplete = (day, type) => {
// // // //     return progress?.some((p) => p.day === day && p.type === type);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-[#0E0E2C] to-[#1f1f3a] text-white p-6">
// // // //       {loading ? (
// // // //         <div className="text-center text-gray-400">Loading...</div>
// // // //       ) : !program ? (
// // // //         <div className="text-center text-gray-400">Program not found.</div>
// // // //       ) : (
// // // //         <div className="max-w-4xl mx-auto">
// // // //           <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
// // // //           <p className="text-gray-300 mb-6 capitalize">Goal: {program.goal}</p>

// // // //           {!enrolled && (
// // // //             <button
// // // //               onClick={handleEnroll}
// // // //               className="mb-6 bg-[#00A8FF] px-6 py-2 rounded hover:bg-blue-600 transition"
// // // //             >
// // // //               Enroll in this Program
// // // //             </button>
// // // //           )}

// // // //           {program.days?.map((day, index) => (
// // // //             <div
// // // //               key={index}
// // // //               className="bg-[#2a2a42] rounded-lg p-4 mb-6 shadow space-y-3"
// // // //             >
// // // //               <h3 className="text-xl font-semibold mb-2">Day {index + 1}</h3>

// // // //               {["workout", "meal", "snack", "meditation"].map((type) => {
// // // //                 const item = day[type];
// // // //                 if (!item) return null;

// // // //                 const isDone = isComplete(index, type);
// // // //                 const label =
// // // //                   type.charAt(0).toUpperCase() + type.slice(1);

// // // //                 return (
// // // //                   <div
// // // //                     key={type}
// // // //                     className="flex items-center justify-between bg-gray-800 rounded px-4 py-2"
// // // //                   >
// // // //                     <div>
// // // //                       <p className="font-medium">{label}</p>
// // // //                       <p className="text-sm text-gray-400">
// // // //                         {item.title || item.name}
// // // //                       </p>
// // // //                     </div>
// // // //                     <button
// // // //                       onClick={() => markComplete(index, type)}
// // // //                       disabled={isDone}
// // // //                       className={`${
// // // //                         isDone ? "bg-green-600" : "bg-blue-600"
// // // //                       } px-3 py-1 text-sm rounded hover:opacity-90`}
// // // //                     >
// // // //                       {isDone ? "Completed ✅" : "Mark as Done"}
// // // //                     </button>
// // // //                   </div>
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProgramDetailPage;

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import toast from "react-hot-toast";
// // // import { CheckCircle, Loader, Dumbbell, ChefHat, Salad, Brain } from "lucide-react";

// // // const iconMap = {
// // //   workout: <Dumbbell className="w-4 h-4 mr-1" />,
// // //   meal: <ChefHat className="w-4 h-4 mr-1" />,
// // //   snack: <Salad className="w-4 h-4 mr-1" />,
// // //   meditation: <Brain className="w-4 h-4 mr-1" />,
// // // };

// // // export default function ProgramDetailPage() {
// // //   const { id } = useParams();
// // //   const [program, setProgram] = useState(null);
// // //   const [progress, setProgress] = useState([]);
// // //   const [enrolled, setEnrolled] = useState(false);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       const res = await fetch(`http://localhost:8000/api/programs/${id}`, {
// // //         credentials: "include",
// // //       });
// // //       const data = await res.json();
// // //       if (data.success) setProgram(data.program);
// // //     };

// // //     const fetchProgress = async () => {
// // //       const res = await fetch(`http://localhost:8000/api/programs/${id}/progress`, {
// // //         credentials: "include",
// // //       });
// // //       if (res.status === 200) {
// // //         const data = await res.json();
// // //         setProgress(data.progress.completed);
// // //         setEnrolled(true);
// // //       }
// // //     };

// // //     fetchData();
// // //     fetchProgress();
// // //   }, [id]);

// // //   const markComplete = async (day, type) => {
// // //     const res = await fetch(`http://localhost:8000/api/programs/${id}/complete`, {
// // //       method: "PATCH",
// // //       headers: { "Content-Type": "application/json" },
// // //       credentials: "include",
// // //       body: JSON.stringify({ day, type }),
// // //     });
// // //     const data = await res.json();
// // //     if (data.success) {
// // //       toast.success(`${type} marked complete`);
// // //       setProgress((prev) => [...prev, { day, type }]);
// // //     }
// // //   };

// // //   const isCompleted = (day, type) =>
// // //     progress.some((p) => p.day === day && p.type === type);

// // //   const handleEnroll = async () => {
// // //     const res = await fetch(`http://localhost:8000/api/programs/${id}/enroll`, {
// // //       method: "POST",
// // //       credentials: "include",
// // //     });
// // //     const data = await res.json();
// // //     if (data.success) {
// // //       toast.success("Enrolled!");
// // //       setEnrolled(true);
// // //     } else toast.error(data.message);
// // //   };

// // //   if (loading || !program) {
// // //     return (
// // //       <div className="flex justify-center items-center h-[60vh]">
// // //         <Loader className="animate-spin w-6 h-6" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-[#F4F8FB] py-6 px-4">
// // //       <div className="max-w-5xl mx-auto">
// // //         <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white p-6 rounded-lg mb-8 shadow-md">
// // //           <h1 className="text-3xl font-bold mb-1">{program.name}</h1>
// // //           <p className="text-sm mb-3">Goal: {program.goal}</p>
// // //           {program.trainer && (
// // //             <div className="flex items-center gap-4 mt-3">
// // //               <img
// // //                 src={program.trainer.profilePicture}
// // //                 className="w-14 h-14 rounded-full border-2 border-white"
// // //                 alt="trainer"
// // //               />
// // //               <div>
// // //                 <p className="font-semibold">{program.trainer.name}</p>
// // //                 <p className="text-sm text-white/80">{program.trainer.specialization}</p>
// // //                 <p className="text-xs mt-1 text-white/60">{program.trainer.bio}</p>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {program.days.map((day, index) => (
// // //           <div key={index} className="bg-white p-5 rounded-lg shadow mb-6">
// // //             <h3 className="text-xl font-bold mb-4 text-[#0E0E2C]">Day {index + 1}</h3>
// // //             {["workout", "meal", "snack", "meditation"].map((type) => {
// // //               const item = day[type];
// // //               if (!item) return null;

// // //               const completed = isCompleted(index + 1, type);

// // //               return (
// // //                 <div
// // //                   key={type}
// // //                   className={`flex items-center justify-between bg-gray-50 p-3 rounded mb-3 border ${
// // //                     completed ? "border-green-500 bg-green-50" : "border-gray-200"
// // //                   }`}
// // //                 >
// // //                   <div className="flex items-center gap-3">
// // //                     <img
// // //                       src={item.thumbnail || item.image || "/placeholder.svg"}
// // //                       alt={item.title || item.name}
// // //                       className="w-14 h-14 object-cover rounded"
// // //                     />
// // //                     <div>
// // //                       <p className="font-semibold capitalize">{item.title || item.name}</p>
// // //                       <p className="text-xs text-gray-500">{type}</p>
// // //                     </div>
// // //                   </div>
// // //                   {completed ? (
// // //                     <span className="text-green-600 text-sm flex items-center gap-1">
// // //                       <CheckCircle className="w-4 h-4" /> Completed
// // //                     </span>
// // //                   ) : (
// // //                     <button
// // //                       onClick={() => markComplete(index + 1, type)}
// // //                       className="text-blue-600 text-sm px-2 py-1 border rounded hover:bg-blue-50"
// // //                     >
// // //                       Mark as Complete
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         ))}

// // //         {!enrolled && (
// // //           <div className="mt-10 text-center">
// // //             <button
// // //               onClick={handleEnroll}
// // //               className="px-6 py-3 bg-[#00A8FF] text-white font-semibold rounded-lg shadow hover:bg-[#007ACC]"
// // //             >
// // //               Enroll in this Program
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import { CheckCircle, Loader, Dumbbell, ChefHat, Salad, Brain } from "lucide-react";

// // const iconMap = {
// //   workout: <Dumbbell className="w-4 h-4 mr-1" />,
// //   meal: <ChefHat className="w-4 h-4 mr-1" />,
// //   snack: <Salad className="w-4 h-4 mr-1" />,
// //   meditation: <Brain className="w-4 h-4 mr-1" />,
// // };

// // export default function ProgramDetailPage() {
// //   const { id: programId } = useParams(); // Rename id to programId for consistency
// //   const [program, setProgram] = useState(null);
// //   const [progress, setProgress] = useState([]);
// //   const [enrolled, setEnrolled] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const res = await fetch(`http://localhost:8000/api/programs/${programId}`, {
// //         credentials: "include",
// //       });
// //       const data = await res.json();
// //       if (data.success) setProgram(data.program);
// //     };

// //     const fetchProgress = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:8000/api/programs/${programId}/progress`, {
// //           credentials: "include",
// //         });
        
// //         if (res.ok) {
// //           const data = await res.json();
// //           setProgress(data.progress?.completed || []);
// //           setEnrolled(true);
// //         } else if (res.status === 404) {
// //           setEnrolled(false);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching progress:", error);
// //         setEnrolled(false);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //     fetchProgress();
// //   }, [programId]);

// //   const markComplete = async (day, type) => {
// //     try {
// //       const res = await fetch(`http://localhost:8000/api/programs/${programId}/complete`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ day, type }),
// //       });
      
// //       if (res.ok) {
// //         const data = await res.json();
// //         toast.success(`${type} marked complete`);
// //         setProgress((prev) => [...prev, { day, type }]);
// //       } else {
// //         const errorData = await res.json();
// //         toast.error(errorData.message || "Failed to mark complete");
// //       }
// //     } catch (error) {
// //       toast.error("Network error");
// //     }
// //   };

// //   const isCompleted = (day, type) =>
// //     progress.some((p) => p.day === day && p.type === type);

// //   const handleEnroll = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:8000/api/programs/${programId}/enroll`, {
// //         method: "POST",
// //         credentials: "include",
// //       });
      
// //       if (res.ok) {
// //         const data = await res.json();
// //         toast.success("Enrolled successfully!");
// //         setEnrolled(true);
// //         // Fetch progress after enrolling
// //         const progressRes = await fetch(`http://localhost:8000/api/programs/${programId}/progress`, {
// //           credentials: "include",
// //         });
// //         if (progressRes.ok) {
// //           const progressData = await progressRes.json();
// //           setProgress(progressData.progress?.completed || []);
// //         }
// //       } else {
// //         const errorData = await res.json();
// //         toast.error(errorData.message || "Enrollment failed");
// //       }
// //     } catch (error) {
// //       toast.error("Network error during enrollment");
// //     }
// //   };

// //   if (loading || !program) {
// //     return (
// //       <div className="flex justify-center items-center h-[60vh]">
// //         <Loader className="animate-spin w-6 h-6" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#F4F8FB] py-6 px-4">
// //       <div className="max-w-5xl mx-auto">
// //         <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white p-6 rounded-lg mb-8 shadow-md">
// //           <h1 className="text-3xl font-bold mb-1">{program.name}</h1>
// //           <p className="text-sm mb-3">Goal: {program.goal}</p>
// //           {program.trainer && (
// //             <div className="flex items-center gap-4 mt-3">
// //               <img
// //                 src={program.trainer.profilePicture}
// //                 className="w-14 h-14 rounded-full border-2 border-white"
// //                 alt="trainer"
// //               />
// //               <div>
// //                 <p className="font-semibold">{program.trainer.name}</p>
// //                 <p className="text-sm text-white/80">{program.trainer.specialization}</p>
// //                 <p className="text-xs mt-1 text-white/60">{program.trainer.bio}</p>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {program.days.map((day, index) => (
// //           <div key={index} className="bg-white p-5 rounded-lg shadow mb-6">
// //             <h3 className="text-xl font-bold mb-4 text-[#0E0E2C]">Day {index + 1}</h3>
// //             {["workout", "meal", "snack", "meditation"].map((type) => {
// //               const item = day[type];
// //               if (!item) return null;

// //               const completed = isCompleted(index + 1, type);

// //               return (
// //                 <div
// //                   key={type}
// //                   className={`flex items-center justify-between bg-gray-50 p-3 rounded mb-3 border ${
// //                     completed ? "border-green-500 bg-green-50" : "border-gray-200"
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <img
// //                       src={item.thumbnail || item.image || "/placeholder.svg"}
// //                       alt={item.title || item.name}
// //                       className="w-14 h-14 object-cover rounded"
// //                     />
// //                     <div>
// //                       <p className="font-semibold capitalize">{item.title || item.name}</p>
// //                       <p className="text-xs text-gray-500">{type}</p>
// //                     </div>
// //                   </div>
// //                   {completed ? (
// //                     <span className="text-green-600 text-sm flex items-center gap-1">
// //                       <CheckCircle className="w-4 h-4" /> Completed
// //                     </span>
// //                   ) : (
// //                     enrolled && (
// //                       <button
// //                         onClick={() => markComplete(index + 1, type)}
// //                         className="text-blue-600 text-sm px-2 py-1 border rounded hover:bg-blue-50"
// //                       >
// //                         Mark as Complete
// //                       </button>
// //                     )
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ))}

// //         {!enrolled && (
// //           <div className="mt-10 text-center">
// //             <button
// //               onClick={handleEnroll}
// //               className="px-6 py-3 bg-[#00A8FF] text-white font-semibold rounded-lg shadow hover:bg-[#007ACC]"
// //             >
// //               Enroll in this Program
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// // ProgramDetailPage.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Dumbbell, Salad, Soup, Brain, CalendarDays } from "lucide-react";

// const ProgramDetailPage = () => {
//   const { id } = useParams();
//   const [program, setProgram] = useState(null);
//   const [progress, setProgress] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);
//   const [completedMap, setCompletedMap] = useState({});
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res1 = await fetch(`http://localhost:8000/api/programs/${id}`);
//         const data1 = await res1.json();
//         if (data1.success) setProgram(data1.program);

//         const res2 = await fetch(`http://localhost:8000/api/programs/${id}/progress`, {
//           credentials: "include",
//         });
//         const data2 = await res2.json();
//         if (data2.success) {
//           setProgress(data2.progress);
//           setRecommendation(data2.recommendation);
//           const map = {};
//           data2.progress.completed.forEach((c) => {
//             map[`${c.day}-${c.type}`] = true;
//           });
//           setCompletedMap(map);
//         }
//       } catch {
//         toast.error("Failed to load program");
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleComplete = async (dayIndex, type) => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/programs/${id}/complete`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ day: dayIndex, type }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success(`${type} marked complete`);
//         setProgress(data.progress);
//         setCompletedMap((prev) => ({
//           ...prev,
//           [`${dayIndex}-${type}`]: true,
//         }));
//       } else toast.error(data.message);
//     } catch {
//       toast.error("Failed to mark complete");
//     }
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case "workout":
//         return <Dumbbell className="w-4 h-4 text-blue-600" />;
//       case "meal":
//         return <Soup className="w-4 h-4 text-green-600" />;
//       case "snack":
//         return <Salad className="w-4 h-4 text-yellow-600" />;
//       case "meditation":
//         return <Brain className="w-4 h-4 text-purple-600" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F7F7FD] px-6 py-10 text-[#0E0E2C]">
//       <div className="max-w-5xl mx-auto">
//         {program && (
//           <>
//             <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white rounded-xl p-6 shadow-lg mb-8">
//               <h1 className="text-3xl font-bold">{program.name}</h1>
//               <p className="text-sm mt-1">Goal: {program.goal}</p>
//               <p className="text-sm opacity-80">Duration: {program.days.length} days</p>
//             </div>

//             {progress && (
//               <div className="text-sm text-green-600 font-medium mb-4">
//                 Progress: {progress.completed.length} / {program.days.length * 4} items
//               </div>
//             )}

//             <div className="space-y-6">
//               {program.days.map((day, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white border border-[#DDD] rounded-xl p-4 shadow hover:shadow-md transition"
//                 >
//                   <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                     <CalendarDays className="w-4 h-4 text-[#00A8FF]" /> Day {idx + 1}
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {["workout", "meal", "snack", "meditation"].map((type) => {
//                       const item = day[type];
//                       if (!item) return null;

//                       const isDone = completedMap[`${idx}-${type}`];
//                       return (
//                         <div
//                           key={type}
//                           className={`p-4 rounded-lg border ${
//                             isDone ? "bg-green-50 border-green-500" : "bg-[#F9F9FC]"
//                           }`}
//                         >
//                           <div className="flex items-center gap-2 mb-1">
//                             {getIcon(type)}
//                             <p className="capitalize font-medium">{type}</p>
//                           </div>
//                           <p className="text-sm text-[#0E0E2C] mb-2">{item.title || item.name}</p>
//                           {!isDone && (
//                             <button
//                               onClick={() => handleComplete(idx, type)}
//                               className="text-xs px-3 py-1 rounded bg-[#00A8FF] text-white hover:opacity-90"
//                             >
//                               Mark Complete
//                             </button>
//                           )}
//                           {isDone && <p className="text-xs text-green-600">Completed ✅</p>}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {recommendation && (
//               <div className="mt-10 p-6 bg-gradient-to-br from-[#0E0E2C] to-[#00A8FF] rounded-xl text-white">
//                 <h2 className="text-xl font-bold mb-2">Recommended Next Program</h2>
//                 <p className="text-lg font-semibold">{recommendation.name}</p>
//                 <p className="text-sm opacity-80">Goal: {recommendation.goal}</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProgramDetailPage;


"use client"

import React from "react"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import toast from "react-hot-toast"
import {
  Dumbbell,
  Salad,
  Soup,
  Brain,
  CalendarDays,
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  TrendingUp,
  BarChart2,
  Flame,
  StretchVerticalIcon as Stretch,
  Info,
  X,
  ChevronUp,
} from "lucide-react"

const ProgramDetailPage = () => {
  const { id } = useParams()
  const [program, setProgram] = useState(null)
  const [progress, setProgress] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [completedMap, setCompletedMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeDay, setActiveDay] = useState(0)
  const [processingItem, setProcessingItem] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const dayRefs = useRef([])
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch program details
        const res1 = await fetch(`http://localhost:8000/api/programs/${id}`)
        const data1 = await res1.json()

        if (!res1.ok) {
          throw new Error(data1.message || "Failed to load program")
        }

        if (data1.success) {
          setProgram(data1.program)
          // Initialize day refs
          dayRefs.current = Array(data1.program.days.length)
            .fill()
            .map(() => React.createRef())
        } else {
          throw new Error(data1.message || "Failed to load program")
        }

        // Fetch user progress
        const res2 = await fetch(`http://localhost:8000/api/programs/${id}/progress`, {
          credentials: "include",
        })
        const data2 = await res2.json()

        if (data2.success) {
          setProgress(data2.progress)
          setRecommendation(data2.recommendation)

          // Create a map of completed items
          const map = {}
          data2.progress.completed.forEach((c) => {
            map[`${c.day}-${c.type}`] = true
          })
          setCompletedMap(map)
        }
      } catch (err) {
        console.error("Error loading program:", err)
        setError(err.message || "Failed to load program")
        toast.error(err.message || "Failed to load program")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleComplete = async (dayIndex, type) => {
    // Set processing state
    setProcessingItem(`${dayIndex}-${type}`)

    try {
      const res = await fetch(`http://localhost:8000/api/programs/${id}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ day: dayIndex, type }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} marked as complete!`)
        setProgress(data.progress)
        setCompletedMap((prev) => ({
          ...prev,
          [`${dayIndex}-${type}`]: true,
        }))
      } else {
        toast.error(data.message || "Failed to mark as complete")
      }
    } catch (err) {
      console.error("Error marking complete:", err)
      toast.error("Failed to mark as complete. Please try again.")
    } finally {
      setProcessingItem(null)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "workout":
        return <Dumbbell className="w-5 h-5 text-blue-600" />
      case "meal":
        return <Soup className="w-5 h-5 text-green-600" />
      case "snack":
        return <Salad className="w-5 h-5 text-yellow-600" />
      case "meditation":
        return <Brain className="w-5 h-5 text-purple-600" />
      default:
        return null
    }
  }

  const getGoalIcon = (goal) => {
    if (!goal) return <BarChart2 className="w-5 h-5" />

    switch (goal.toLowerCase()) {
      case "strength":
        return <Dumbbell className="w-5 h-5" />
      case "weightloss":
        return <Flame className="w-5 h-5" />
      case "cardio":
        return <TrendingUp className="w-5 h-5" />
      case "flexibility":
        return <Stretch className="w-5 h-5" />
      default:
        return <BarChart2 className="w-5 h-5" />
    }
  }

  const calculateProgress = () => {
    if (!progress || !program) return 0

    const completedItems = progress.completed.length
    const totalItems = program.days.length * 4 // 4 items per day (workout, meal, snack, meditation)

    return Math.round((completedItems / totalItems) * 100)
  }

  const navigateToDay = (index) => {
    setActiveDay(index)
    // Scroll to the day
    if (dayRefs.current[index] && dayRefs.current[index].current) {
      dayRefs.current[index].current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const getNextIncompleteDay = () => {
    if (!program || !progress) return 0

    // Find the first day with incomplete items
    for (let i = 0; i < program.days.length; i++) {
      const day = program.days[i]
      const types = ["workout", "meal", "snack", "meditation"]

      for (const type of types) {
        if (day[type] && !completedMap[`${i}-${type}`]) {
          return i
        }
      }
    }

    return 0
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A8FF]"></div>
        <p className="mt-4 text-gray-500">Loading program...</p>
      </div>
    )
  }

  // If error, show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md w-full text-center">
          <X className="w-8 h-8 mx-auto mb-2" />
          <h2 className="text-lg font-bold mb-2">Error Loading Program</h2>
          <p>{error}</p>
          <Link to="/programs" className="mt-4 inline-block text-[#00A8FF] hover:underline">
            Return to Programs
          </Link>
        </div>
      </div>
    )
  }

  // If no program, show not found state
  if (!program) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-100 p-4 rounded-lg max-w-md w-full text-center">
          <Info className="w-8 h-8 mx-auto mb-2 text-gray-500" />
          <h2 className="text-lg font-bold mb-2">Program Not Found</h2>
          <p className="text-gray-600">The program you're looking for doesn't exist or has been removed.</p>
          <Link to="/programs" className="mt-4 inline-block text-[#00A8FF] hover:underline">
            Browse Programs
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = calculateProgress()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0E0E2C] to-[#00A8FF] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                  {getGoalIcon(program.goal)}
                  <span className="capitalize">{program.goal}</span>
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {program.days.length} Days
                </span>
              </div>
              <h1 className="text-3xl font-bold">{program.name}</h1>
              <p className="text-white/80 mt-1">
                {program.description ||
                  `A comprehensive ${program.goal} program designed to help you achieve your fitness goals.`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={program.trainer?.profilePicture || "/placeholder.svg?height=48&width=48"}
                alt={program.trainer?.name || "Trainer"}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=48&width=48"
                }}
              />
              <div>
                <p className="font-medium">{program.trainer?.name || "Trainer"}</p>
                <p className="text-xs text-white/70">{program.trainer?.specialization || "Fitness Coach"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#0E0E2C]">Program Progress</span>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Show progress info"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[#00A8FF] font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#00A8FF] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Progress Info Tooltip */}
            {showInfo && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 relative">
                <button
                  onClick={() => setShowInfo(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="mb-1">
                  <span className="font-medium">Completed:</span> {progress.completed.length} of{" "}
                  {program.days.length * 4} items
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <Dumbbell className="w-3 h-3 text-blue-600" />
                    <span>Workouts: </span>
                    <span className="font-medium">
                      {progress.completed.filter((c) => c.type === "workout").length} of {program.days.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Soup className="w-3 h-3 text-green-600" />
                    <span>Meals: </span>
                    <span className="font-medium">
                      {progress.completed.filter((c) => c.type === "meal").length} of {program.days.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Salad className="w-3 h-3 text-yellow-600" />
                    <span>Snacks: </span>
                    <span className="font-medium">
                      {progress.completed.filter((c) => c.type === "snack").length} of {program.days.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Brain className="w-3 h-3 text-purple-600" />
                    <span>Meditations: </span>
                    <span className="font-medium">
                      {progress.completed.filter((c) => c.type === "meditation").length} of {program.days.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Day Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToDay(Math.max(0, activeDay - 1))}
              disabled={activeDay === 0}
              className={`p-1 rounded-full ${activeDay === 0 ? "text-gray-300" : "text-gray-500 hover:bg-gray-200"}`}
              aria-label="Previous day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 overflow-x-auto py-1 hide-scrollbar">
              {program.days.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => navigateToDay(idx)}
                  className={`min-w-[36px] h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    activeDay === idx
                      ? "bg-[#00A8FF] text-white"
                      : "bg-white border border-gray-300 text-[#0E0E2C] hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigateToDay(Math.min(program.days.length - 1, activeDay + 1))}
              disabled={activeDay === program.days.length - 1}
              className={`p-1 rounded-full ${
                activeDay === program.days.length - 1 ? "text-gray-300" : "text-gray-500 hover:bg-gray-200"
              }`}
              aria-label="Next day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {program.days.map((day, idx) => (
            <div
              key={idx}
              ref={dayRefs.current[idx]}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                activeDay === idx ? "shadow-md border-[#00A8FF]" : "border-gray-200"
              }`}
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-[#00A8FF]" /> Day {idx + 1}
                  </h3>

                  {/* Day Progress */}
                  {progress && (
                    <div className="text-sm">
                      <span className="text-gray-600">Completed: </span>
                      <span className="font-medium">
                        {
                          ["workout", "meal", "snack", "meditation"].filter(
                            (type) => day[type] && completedMap[`${idx}-${type}`],
                          ).length
                        }
                        /{["workout", "meal", "snack", "meditation"].filter((type) => day[type]).length}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["workout", "meal", "snack", "meditation"].map((type) => {
                    const item = day[type]
                    if (!item) return null

                    const isDone = completedMap[`${idx}-${type}`]
                    const isProcessing = processingItem === `${idx}-${type}`

                    return (
                      <div
                        key={type}
                        className={`rounded-lg overflow-hidden border ${
                          isDone
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200 hover:border-[#00A8FF]/50 transition-colors"
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getIcon(type)}
                              <h4 className="font-medium capitalize">{type}</h4>
                            </div>
                            {isDone && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Completed
                              </span>
                            )}
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={item.thumbnail || "/placeholder.svg?height=48&width=48"}
                                alt={item.title || item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg?height=48&width=48"
                                }}
                              />
                            </div>
                            <div>
                              <h5 className="font-medium text-[#0E0E2C] mb-1">{item.title || item.name}</h5>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {item.description ||
                                  `${type.charAt(0).toUpperCase() + type.slice(1)} for day ${idx + 1}`}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <Link
                              to={`/${type}s/${item._id}`}
                              className="text-[#00A8FF] text-sm font-medium hover:underline flex items-center gap-1"
                            >
                              View Details <ChevronRight className="w-4 h-4" />
                            </Link>

                            {!isDone && (
                              <button
                                onClick={() => handleComplete(idx, type)}
                                disabled={isProcessing}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                                  isProcessing
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-[#00A8FF] text-white hover:bg-[#0096E6]"
                                } transition-colors flex items-center gap-1`}
                              >
                                {isProcessing ? (
                                  <>
                                    <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div>
                                    <span>Processing...</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Mark Complete</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Section */}
        {recommendation && (
          <div className="mt-12 bg-gradient-to-br from-[#0E0E2C] to-[#00A8FF] rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-6 h-6 text-yellow-300" />
                  <h2 className="text-xl font-bold text-white">Recommended Next Program</h2>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                        {getGoalIcon(recommendation.goal)}
                        <span className="capitalize">{recommendation.goal}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{recommendation.name}</h3>
                    <p className="text-white/80 text-sm mt-1">
                      {recommendation.description ||
                        `Continue your fitness journey with this ${recommendation.goal} program.`}
                    </p>
                  </div>

                  <Link
                    to={`/program/${recommendation._id}`}
                    className="bg-white text-[#00A8FF] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    View Program <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button - Jump to Next Incomplete */}
      {progress && progressPercentage < 100 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => navigateToDay(getNextIncompleteDay())}
            className="bg-[#00A8FF] text-white p-3 rounded-full shadow-lg hover:bg-[#0096E6] transition-colors flex items-center gap-2"
            aria-label="Jump to next incomplete item"
          >
            <ChevronUp className="w-5 h-5" />
            <span className="mr-1">Next Task</span>
          </button>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  )
}

export default ProgramDetailPage
