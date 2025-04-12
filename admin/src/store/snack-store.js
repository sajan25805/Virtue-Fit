import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api"; // Update to match your backend

export const useSnackStore = create((set) => ({
  snacks: [],
  loading: false,
  error: null,

  fetchSnacks: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/snacks");
      set({ snacks: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch snacks",
        loading: false 
      });
    }
  },

  addSnack: async (formData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/snacks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      set((state) => ({
        snacks: [...state.snacks, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to add snack",
        loading: false 
      });
      throw error;
    }
  },

  updateSnack: async (id, formData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/snacks/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      set((state) => ({
        snacks: state.snacks.map((s) => 
          s._id === id ? response.data : s
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to update snack",
        loading: false 
      });
      throw error;
    }
  },

  deleteSnack: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/snacks/${id}`);
      set((state) => ({
        snacks: state.snacks.filter((s) => s._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to delete snack",
        loading: false 
      });
      throw error;
    }
  },
}));