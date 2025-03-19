import { create } from "zustand";

export const useWorkoutStore = create((set) => ({
  workouts: [
    {
      id: "1",
      name: "Full Body HIIT",
      description: "High intensity interval training targeting all major muscle groups",
      difficulty: "Medium",
      type: "Cardio",
      duration: 30,
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: "2",
      name: "Yoga Flow",
      description: "Gentle yoga flow focusing on flexibility and mindfulness",
      difficulty: "Easy",
      type: "Flexibility",
      duration: 45,
      createdAt: Date.now() - 86400000,
    },
    {
      id: "3",
      name: "Strength Training",
      description: "Heavy lifting routine for building muscle mass",
      difficulty: "Hard",
      type: "Strength",
      duration: 60,
      createdAt: Date.now(),
    },
  ],
  addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
  updateWorkout: (id, updatedWorkout) =>
    set((state) => ({
      workouts: state.workouts.map((workout) =>
        workout.id === id ? { ...workout, ...updatedWorkout } : workout
      ),
    })),
  deleteWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((workout) => workout.id !== id),
    })),
}));
