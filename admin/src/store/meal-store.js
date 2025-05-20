import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api"; // Update to match your backend

export const useMealStore = create((set) => ({
  meals: [],
  loading: false,
  error: null,

  fetchMeals: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/meals");
      set({ meals: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch meals",
        loading: false 
      });
    }
  },

  addMeal: async (formData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/meals", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      set((state) => ({
        meals: [...state.meals, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to add meal",
        loading: false 
      });
      throw error;
    }
  },

  updateMeal: async (id, formData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/meals/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      set((state) => ({
        meals: state.meals.map((m) => 
          m._id === id ? response.data : m
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to update meal",
        loading: false 
      });
      throw error;
    }
  },

  deleteMeal: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/meals/${id}`);
      set((state) => ({
        meals: state.meals.filter((m) => m._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to delete meal",
        loading: false 
      });
      throw error;
    }
  },
}));


// import { create } from "zustand";
// import axios from "axios";

// // Set Axios defaults
// axios.defaults.baseURL = "http://localhost:8000/api";
// axios.defaults.withCredentials = true; 

// export const useMealStore = create((set) => ({
//   meals: [],
//   loading: false,
//   error: null,
//   pagination: {
//     page: 1,
//     pages: 1,
//     total: 0,
//   },

//   // Fetch meals with filters and pagination
//   fetchMeals: async (params = {}) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axios.get("/meals", { params });
//       set({
//         meals: response.data.data,
//         pagination: {
//           page: response.data.page,
//           pages: response.data.pages,
//           total: response.data.total,
//         },
//         loading: false,
//       });
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || "Failed to fetch meals",
//         loading: false,
//       });
//       throw error;
//     }
//   },

//   // Get single meal by ID
//   getMealById: async (id) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axios.get(`/meals/${id}`);
//       set({ loading: false });
//       return response.data.data;
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || "Failed to fetch meal",
//         loading: false,
//       });
//       throw error;
//     }
//   },

//   // Create new meal
//   addMeal: async (formData) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axios.post("/meals", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       set((state) => ({
//         meals: [response.data.data, ...state.meals],
//         loading: false,
//       }));
//       return response.data;
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || "Failed to add meal",
//         loading: false,
//       });
//       throw error;
//     }
//   },

// //   // Update existing meal
// //   updateMeal: async (id, formData) => {
// //     set({ loading: true, error: null });
// //     try {
// //       const response = await axios.put(`/meals/${id}`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });
// //       set((state) => ({
// //         meals: state.meals.map((m) =>
// //           m._id === id ? response.data.data : m
// //         ),
// //         loading: false,
// //       }));
// //       return response.data;
// //     } catch (error) {
// //       set({
// //         error: error.response?.data?.message || "Failed to update meal",
// //         loading: false,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Delete meal
// //   deleteMeal: async (id) => {
// //     set({ loading: true, error: null });
// //     try {
// //       await axios.delete(`/meals/${id}`);
// //       set((state) => ({
// //         meals: state.meals.filter((m) => m._id !== id),
// //         loading: false,
// //       }));
// //     } catch (error) {
// //       set({
// //         error: error.response?.data?.message || "Failed to delete meal",
// //         loading: false,
// //       });
// //       throw error;
// //     }
// //   },

// //   // Like/unlike meal
// //   toggleLikeMeal: async (mealId, userId) => {
// //     set({ error: null });
// //     try {
// //       const response = await axios.post(`/meals/${mealId}/like`, { userId });
// //       set((state) => ({
// //         meals: state.meals.map((m) =>
// //           m._id === mealId
// //             ? {
// //                 ...m,
// //                 likes: response.data.isLiked
// //                   ? [...m.likes, userId]
// //                   : m.likes.filter((id) => id !== userId),
// //               }
// //             : m
// //         ),
// //       }));
// //       return response.data;
// //     } catch (error) {
// //       set({
// //         error: error.response?.data?.message || "Failed to toggle like",
// //       });
// //       throw error;
// //     }
// //   },

// //   // Rate meal
// //   rateMeal: async (mealId, ratingData) => {
// //     set({ error: null });
// //     try {
// //       const response = await axios.post(`/meals/${mealId}/rate`, ratingData);
// //       set((state) => ({
// //         meals: state.meals.map((m) =>
// //           m._id === mealId
// //             ? {
// //                 ...m,
// //                 ratings: response.data.data.ratings,
// //                 averageRating: response.data.data.averageRating,
// //               }
// //             : m
// //         ),
// //       }));
// //       return response.data;
// //     } catch (error) {
// //       set({
// //         error: error.response?.data?.message || "Failed to rate meal",
// //       });
// //       throw error;
// //     }
// //   },
// // }));