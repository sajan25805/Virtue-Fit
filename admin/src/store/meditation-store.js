import { create } from "zustand";

export const useMeditationStore = create((set) => ({
  meditations: [
    {
      id: "1",
      name: "Morning Mindfulness",
      description: "Start your day with clarity and intention",
      category: "Mindfulness",
      duration: 10,
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: "2",
      name: "Deep Sleep",
      description: "Guided meditation to help you fall asleep faster",
      category: "Sleep",
      duration: 20,
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: "3",
      name: "Breath Work",
      description: "Focused breathing exercises to reduce stress",
      category: "Breathing",
      duration: 15,
      createdAt: Date.now() - 86400000,
    },
  ],
  addMeditation: (meditation) => set((state) => ({ meditations: [...state.meditations, meditation] })),
  updateMeditation: (id, updatedMeditation) =>
    set((state) => ({
      meditations: state.meditations.map((meditation) =>
        meditation.id === id ? { ...meditation, ...updatedMeditation } : meditation
      ),
    })),
  deleteMeditation: (id) =>
    set((state) => ({
      meditations: state.meditations.filter((meditation) => meditation.id !== id),
    })),
}));
