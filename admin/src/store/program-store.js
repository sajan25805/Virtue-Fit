import { create } from "zustand";

export const useProgramStore = create((set) => ({
  programs: [
    {
      id: "1",
      name: "Weight Loss Program",
      description: "A 4-week program designed to help with weight loss",
      active: true,
      workoutIds: ["1", "3"],
      mealIds: ["2", "3"],
      meditationIds: ["3"],
      createdAt: Date.now() - 86400000 * 7,
    },
    {
      id: "2",
      name: "Stress Relief",
      description: "A program focused on reducing stress and improving mental wellbeing",
      active: false,
      workoutIds: ["2"],
      mealIds: ["3"],
      meditationIds: ["1", "2", "3"],
      createdAt: Date.now() - 86400000 * 3,
    },
  ],
  addProgram: (program) => set((state) => ({ programs: [...state.programs, program] })),
  updateProgram: (id, updatedProgram) =>
    set((state) => ({
      programs: state.programs.map((program) =>
        program.id === id ? { ...program, ...updatedProgram } : program
      ),
    })),
  deleteProgram: (id) =>
    set((state) => ({
      programs: state.programs.filter((program) => program.id !== id),
    })),
}));
