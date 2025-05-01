// authStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isChecking: true, // ✅ NEW STATE
  error: null,
  isLoading: false,

  checkAuth: async () => {
    set({ isChecking: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`, {
        withCredentials: true,
      });
      const user = response.data.user;
      set({
        user,
        isAuthenticated: true,
        isChecking: false,
      });
      localStorage.setItem("userId", user._id);
    } catch (error) {
      set({ isAuthenticated: false, user: null, isChecking: false });
      console.error("Check auth failed", error);
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        withCredentials: true,
      });
      const user = response.data.user;
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem("userId", user._id); // ✅ store user ID
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Signing Up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData, {
        withCredentials: true,
      });
      const user = response.data.user;
      set({
        user,
        isAuthenticated: true, // ✅ Ensure this is set
        error: null,
        isLoading: false,
      });
      localStorage.setItem("userId", user._id);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
      localStorage.removeItem("userId"); // ✅ clear user ID
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
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
