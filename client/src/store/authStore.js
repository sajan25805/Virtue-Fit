import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,

  signup: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error Signing Up", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({isLoading:true, error: null});

    try {

      const response = await axios.post(`${API_URL}/auth/verify-email`,{code});
      set({user:response.data.user, isAuthenticated: true, isLoading: false});
      return response.data

    }
    catch(error) {
      set({error: error.response.data.message || "Error Verifying Email", isLoading:false})
      throw error;
    }
  }
}));
