


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