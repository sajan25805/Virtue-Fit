import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isChecking: true,

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        withCredentials: true,
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error Signing Up", isLoading: false });
      throw error;
    }
  },

  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Login failed", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout request failed:", err.message);
    }
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    set({ isChecking: true });
    try {
      const res = await axios.get(`${API_URL}/auth/check-auth`, {
        withCredentials: true,
      });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isChecking: false,
      });
    } catch (err) {
      set({ isChecking: false });
    }
  },
  
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, { code }, {
        withCredentials: true,
      });
      const user = response.data.user;
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem("userId", user._id);
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Verifying Email",
        isLoading: false,
      });
      throw error;
    }
  },

}));
