import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const useProgramStore = create((set) => ({
  programs: [],
  loading: false,
  error: null,

  // 🔄 Fetch all programs
  fetchPrograms: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/programs", { withCredentials: true });
      if (res.data.success) {
        set({ programs: res.data.programs });
      } else {
        set({ error: res.data.message || "Failed to fetch programs" });
      }
    } catch (err) {
      set({ error: err.message || "Error fetching programs" });
    } finally {
      set({ loading: false });
    }
  },

  // ➕ Create new program
  createProgram: async (programData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/programs", programData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        set((state) => ({
          programs: [res.data.program, ...state.programs],
        }));
        return { success: true, program: res.data.program };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },

  // ✏️ Update existing program
  updateProgram: async (id, updatedData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/programs/${id}`, updatedData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        set((state) => ({
          programs: state.programs.map((p) =>
            p._id === id ? res.data.program : p
          ),
        }));
        return { success: true, program: res.data.program };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },

  // ❌ Delete program
  deleteProgram: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/programs/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        set((state) => ({
          programs: state.programs.filter((p) => p._id !== id),
        }));
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },
}));
