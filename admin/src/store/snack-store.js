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
