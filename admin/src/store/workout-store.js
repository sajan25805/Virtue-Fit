// // // import { create } from "zustand";

// // // export const useWorkoutStore = create((set) => ({
// // //   workouts: [
// // //     {
// // //       id: "1",
// // //       name: "Full Body HIIT",
// // //       description: "High intensity interval training targeting all major muscle groups",
// // //       difficulty: "Medium",
// // //       type: "Cardio",
// // //       duration: 30,
// // //       createdAt: Date.now() - 86400000 * 2,
// // //     },
// // //     {
// // //       id: "2",
// // //       name: "Yoga Flow",
// // //       description: "Gentle yoga flow focusing on flexibility and mindfulness",
// // //       difficulty: "Easy",
// // //       type: "Flexibility",
// // //       duration: 45,
// // //       createdAt: Date.now() - 86400000,
// // //     },
// // //     {
// // //       id: "3",
// // //       name: "Strength Training",
// // //       description: "Heavy lifting routine for building muscle mass",
// // //       difficulty: "Hard",
// // //       type: "Strength",
// // //       duration: 60,
// // //       createdAt: Date.now(),
// // //     },
// // //   ],
// // //   addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
// // //   updateWorkout: (id, updatedWorkout) =>
// // //     set((state) => ({
// // //       workouts: state.workouts.map((workout) =>
// // //         workout.id === id ? { ...workout, ...updatedWorkout } : workout
// // //       ),
// // //     })),
// // //   deleteWorkout: (id) =>
// // //     set((state) => ({
// // //       workouts: state.workouts.filter((workout) => workout.id !== id),
// // //     })),
// // // }));



// // import { create } from 'zustand'
// // import axios from 'axios'


// // axios.defaults.baseURL = 'http://localhost:8000';



// // export const useWorkoutStore = create((set) => ({
// //   workouts: [],

// //   // Fetch workouts from the API
// //   fetchWorkouts: async () => {
// //     try {
// //       const response = await axios.get('/api/workouts')
// //       set({ workouts: response.data })
// //     } catch (error) {
// //       console.error('Error fetching workouts:', error)
// //     }
// //   },

// //   // Add a new workout to the store and backend
// //   addWorkout: async (workout) => {
// //     try {
// //       const response = await axios.post('/api/workouts', workout)
// //       set((state) => ({ workouts: [...state.workouts, response.data] }))
// //     } catch (error) {
// //       console.error('Error adding workout:', error)
// //     }
// //   },

// //   // Update an existing workout in the store and backend
// //   updateWorkout: async (id, workout) => {
// //     try {
// //       const response = await axios.put(`/api/workouts/${id}`, workout)
// //       set((state) => ({
// //         workouts: state.workouts.map((w) => (w.id === id ? { ...w, ...response.data } : w)),
// //       }))
// //     } catch (error) {
// //       console.error('Error updating workout:', error)
// //     }
// //   },

// //   // Delete a workout from the store and backend
// //   deleteWorkout: async (id) => {
// //     try {
// //       await axios.delete(`/api/workouts/${id}`)
// //       set((state) => ({
// //         workouts: state.workouts.filter((workout) => workout.id !== id),
// //       }))
// //     } catch (error) {
// //       console.error('Error deleting workout:', error)
// //     }
// //   },
// // }))





// import { create } from "zustand"
// import axios from "axios"

// axios.defaults.baseURL = "http://localhost:8000"

// export const useWorkoutStore = create((set) => ({
//   // Initialize workouts as an empty array
//   workouts: [],

//   // Fetch workouts from the API
//   fetchWorkouts: async () => {
//     try {
//       const response = await axios.get("/api/workouts")
//       // Ensure we're setting an array, even if the API returns something unexpected
//       set({ workouts: Array.isArray(response.data) ? response.data : [] })
//     } catch (error) {
//       console.error("Error fetching workouts:", error)
//       // Always set to an empty array if there's an error
//       set({ workouts: [] })
//     }
//   },

//   // Add a new workout to the store and backend
//   addWorkout: async (workout) => {
//     try {
//       const response = await axios.post("/api/workouts/create", workout)
//       set((state) => ({
//         // Ensure we're working with an array
//         workouts: [...(Array.isArray(state.workouts) ? state.workouts : []), response.data],
//       }))
//       return response.data
//     } catch (error) {
//       console.error("Error adding workout:", error)
//       return null
//     }
//   },

//   // Update an existing workout in the store and backend
//   updateWorkout: async (id, workout) => {
//     try {
//       const response = await axios.put(`/api/workouts/${id}`, workout)
//       set((state) => {
//         // Ensure we're working with an array
//         const currentWorkouts = Array.isArray(state.workouts) ? state.workouts : []
//         return {
//           workouts: currentWorkouts.map((w) => (w.id === id ? { ...w, ...response.data } : w)),
//         }
//       })
//       return response.data
//     } catch (error) {
//       console.error("Error updating workout:", error)
//       return null
//     }
//   },

//   // Delete a workout from the store and backend
//   deleteWorkout: async (id) => {
//     try {
//       await axios.delete(`/api/workouts/${id}`)
//       set((state) => {
//         // Ensure we're working with an array
//         const currentWorkouts = Array.isArray(state.workouts) ? state.workouts : []
//         return {
//           workouts: currentWorkouts.filter((workout) => workout.id !== id),
//         }
//       })
//       return true
//     } catch (error) {
//       console.error("Error deleting workout:", error)
//       return false
//     }
//   },
// }))




import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api"; // Update to match your backend

export const useWorkoutStore = create((set) => ({
  workouts: [],
  loading: false,
  error: null,

  fetchWorkouts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/workouts");
      set({ workouts: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch workouts",
        loading: false 
      });
    }
  },

  addWorkout: async (formData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/workouts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      set((state) => ({
        workouts: [...state.workouts, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to add workout",
        loading: false 
      });
      throw error;
    }
  },
  
  updateWorkout: async (id, formData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/workouts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      set((state) => ({
        workouts: state.workouts.map((w) => 
          w._id === id ? response.data : w
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to update workout",
        loading: false 
      });
      throw error;
    }
  },

  deleteWorkout: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/workouts/${id}`);
      set((state) => ({
        workouts: state.workouts.filter((w) => w._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to delete workout",
        loading: false 
      });
      throw error;
    }
  },
}));