// store/adminAuthStore.js
import { create } from "zustand";
import { BASE_URL } from "../utils/constants";

export const useAdminAuthStore = create((set) => ({
  admin: null,
  isLoading: true,
  error: null,

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/api/admin/check-auth`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      set({ admin: data.admin, isLoading: false });
    } catch (err) {
      set({ admin: null, error: err.message, isLoading: false });
    }
  },

  logout: async () => {
    await fetch(`${BASE_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    set({ admin: null });
  },
}));
