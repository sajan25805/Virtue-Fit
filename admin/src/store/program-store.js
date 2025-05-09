import { create } from 'zustand';

export const useProgramStore = create((set) => ({
  programs: [],
  loading: false,
  error: null,

  fetchPrograms: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:8000/api/programs", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) set({ programs: data.programs });
      else set({ error: data.message });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createProgram: async (program) => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:8000/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(program),
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({ programs: [...state.programs, data.program] }));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      set({ loading: false });
    }
  },

  updateProgram: async (id, program) => {
    set({ loading: true });
    try {
      const res = await fetch(`http://localhost:8000/api/programs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(program),
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          programs: state.programs.map((p) => (p._id === id ? data.program : p)),
        }));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      set({ loading: false });
    }
  },

  deleteProgram: async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/programs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          programs: state.programs.filter((p) => p._id !== id),
        }));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
