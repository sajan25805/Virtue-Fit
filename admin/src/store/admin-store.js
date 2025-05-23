import { create } from "zustand";
import { BASE_URL } from "../utils/constants";

export const useAdminStore = create((set) => ({
  users: [],
  trainers: [],
  stats: {},
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/admin/users`, {
        credentials: "include",
      });
      const data = await res.json();
      set({ users: data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch users", isLoading: false });
    }
  },

  updateUser: async (userId, userData) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const updated = await res.json();
      set((state) => ({
        users: state.users.map((u) => (u._id === userId ? updated : u)),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Failed to update user", isLoading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Failed to delete user", isLoading: false });
    }
  },

  fetchTrainers: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/admin/trainers`, {
        credentials: "include",
      });
      const data = await res.json();
      set({ trainers: data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch trainers", isLoading: false });
    }
  },

  updateTrainer: async (trainerId, trainerData) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/admin/trainers/${trainerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainerData),
        credentials: "include",
      });
      const updated = await res.json();
      set((state) => ({
        trainers: state.trainers.map((t) =>
          t._id === trainerId ? updated : t
        ),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Failed to update trainer", isLoading: false });
    }
  },

  deleteTrainer: async (trainerId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/api/admin/trainers/${trainerId}`, {
        method: "DELETE",
        credentials: "include",
      });
      set((state) => ({
        trainers: state.trainers.filter((t) => t._id !== trainerId),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Failed to delete trainer", isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${BASE_URL}/api/admin/stats`, {
        credentials: "include",
      });
      const data = await res.json();
      set({ stats: data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch stats", isLoading: false });
    }
  },
}));
