import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api"; // Update to match your backend

export const useMeditationStore = create((set) => ({
  meditations: [],
  loading: false,
  error: null,

  // Fetch all meditations
  fetchMeditations: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/meditations");
      set({ meditations: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch meditations",
        loading: false 
      });
    }
  },

  // Fetch meditations by trainer
  fetchMeditationsByTrainer: async (trainerId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/meditations/trainer/${trainerId}`);
      set({ meditations: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch trainer's meditations",
        loading: false 
      });
    }
  },

  // // Add new meditation
  // addMeditation: async (formData) => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.post("/meditations", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
      
  //     set((state) => ({
  //       meditations: [...state.meditations, response.data],
  //       loading: false
  //     }));
  //     return response.data;
  //   } catch (error) {
  //     set({ 
  //       error: error.response?.data?.message || "Failed to add meditation",
  //       loading: false 
  //     });
  //     throw error;
  //   }
  // },


  addMeditation: async (formData) => {
    set({ loading: true });
    try {
      console.log("Sending meditation data to backend");
      const response = await axios.post("/meditations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          console.log(`Upload progress: ${Math.round((progressEvent.loaded * 100) / progressEvent.total)}%`);
        },
      });
      
      console.log("Meditation created successfully:", response.data);
      set((state) => ({
        meditations: [...state.meditations, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      console.error("Error adding meditation:", error);
      console.error("Error response:", error.response);
      set({ 
        error: error.response?.data?.message || "Failed to add meditation",
        loading: false 
      });
      throw error;
    }
  },
  

  // Update meditation
  updateMeditation: async (id, formData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/meditations/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      set((state) => ({
        meditations: state.meditations.map((m) => 
          m._id === id ? response.data : m
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to update meditation",
        loading: false 
      });
      throw error;
    }
  },

  // Delete meditation
  deleteMeditation: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/meditations/${id}`);
      set((state) => ({
        meditations: state.meditations.filter((m) => m._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to delete meditation",
        loading: false 
      });
      throw error;
    }
  },

  // Get single meditation by ID
  getMeditationById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/meditations/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch meditation",
        loading: false 
      });
      throw error;
    }
  },
}));
