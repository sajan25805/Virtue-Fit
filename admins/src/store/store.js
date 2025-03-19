import { create } from "zustand"

// Sample data
const sampleMeals = [
  {
    id: "1",
    title: "High Protein Breakfast",
    description: "Perfect for muscle building and recovery",
    calories: 450,
    macronutrients: { protein: "30g", carbs: "40g", fats: "15g" },
    recipes: "Scrambled eggs with spinach, whole grain toast, and avocado",
  },
  {
    id: "2",
    title: "Post-Workout Smoothie",
    description: "Quick recovery drink with optimal nutrition",
    calories: 320,
    macronutrients: { protein: "25g", carbs: "35g", fats: "8g" },
    recipes: "Blend banana, protein powder, almond milk, and berries",
  },
  {
    id: "3",
    title: "Balanced Lunch Bowl",
    description: "Nutrient-dense meal for sustained energy",
    calories: 550,
    macronutrients: { protein: "35g", carbs: "60g", fats: "18g" },
    recipes: "Grilled chicken, quinoa, roasted vegetables, and tahini dressing",
  },
]

const sampleMeditations = [
  {
    id: "1",
    title: "Morning Mindfulness",
    description: "Start your day with clarity and intention",
    duration: "10 minutes",
    audioUrl: "/meditations/morning-mindfulness.mp3",
    category: "Mindfulness",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Recovery Relaxation",
    description: "Deep relaxation for post-workout recovery",
    duration: "15 minutes",
    audioUrl: "/meditations/recovery-relaxation.mp3",
    category: "Recovery",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "Sleep Preparation",
    description: "Prepare your mind and body for restful sleep",
    duration: "20 minutes",
    audioUrl: "/meditations/sleep-preparation.mp3",
    category: "Sleep",
    level: "All Levels",
  },
]

const samplePrograms = [
  {
    id: "1",
    name: "Weight Loss Kickstart",
    goal: "Fat loss and improved fitness",
    workouts: ["HIIT Cardio", "Full Body Strength", "Active Recovery"],
    meals: ["Balanced Breakfast", "Protein-Rich Lunch", "Light Dinner"],
    meditations: ["Stress Relief", "Sleep Improvement"],
  },
  {
    id: "2",
    name: "Muscle Builder",
    goal: "Increase muscle mass and strength",
    workouts: ["Upper Body Power", "Lower Body Strength", "Core Conditioning"],
    meals: ["Protein Breakfast", "Recovery Lunch", "Protein-Rich Dinner"],
    meditations: ["Recovery Focus", "Visualization"],
  },
  {
    id: "3",
    name: "Wellness Balance",
    goal: "Overall wellness and stress reduction",
    workouts: ["Yoga Flow", "Light Cardio", "Mobility Training"],
    meals: ["Anti-inflammatory Breakfast", "Nutrient-Dense Lunch", "Light Dinner"],
    meditations: ["Morning Mindfulness", "Evening Relaxation"],
  },
]

const sampleWorkouts = [
  {
    id: "1",
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum calorie burn",
    difficulty: "Intermediate",
    duration: "30 minutes",
    videoUrl: "/workouts/hiit-cardio.mp4",
    aim: "Cardiovascular fitness and fat burning",
    steps: [
      "Warm up for 5 minutes",
      "30 seconds sprint, 30 seconds rest (repeat 10 times)",
      "Body weight exercises for 10 minutes",
      "Cool down for 5 minutes",
    ],
  },
  {
    id: "2",
    title: "Full Body Strength",
    description: "Comprehensive strength training for all major muscle groups",
    difficulty: "Advanced",
    duration: "45 minutes",
    videoUrl: "/workouts/full-body-strength.mp4",
    aim: "Build strength and muscle endurance",
    steps: [
      "Warm up for 5 minutes",
      "Compound exercises: squats, deadlifts, bench press",
      "Isolation exercises for smaller muscle groups",
      "Cool down and stretch for 5 minutes",
    ],
  },
  {
    id: "3",
    title: "Yoga for Recovery",
    description: "Gentle yoga flow to enhance recovery and flexibility",
    difficulty: "Beginner",
    duration: "40 minutes",
    videoUrl: "/workouts/yoga-recovery.mp4",
    aim: "Improve flexibility and aid recovery",
    steps: [
      "Begin with breathing exercises",
      "Gentle stretching sequence",
      "Hold restorative poses",
      "End with guided relaxation",
    ],
  },
]

const useStore = create((set) => ({
  meals: sampleMeals,
  meditations: sampleMeditations,
  programs: samplePrograms,
  workouts: sampleWorkouts,

  // Actions for meals
  addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
  updateMeal: (id, updatedMeal) =>
    set((state) => ({
      meals: state.meals.map((meal) => (meal.id === id ? { ...meal, ...updatedMeal } : meal)),
    })),
  deleteMeal: (id) => set((state) => ({ meals: state.meals.filter((meal) => meal.id !== id) })),

  // Actions for meditations
  addMeditation: (meditation) => set((state) => ({ meditations: [...state.meditations, meditation] })),
  updateMeditation: (id, updatedMeditation) =>
    set((state) => ({
      meditations: state.meditations.map((meditation) =>
        meditation.id === id ? { ...meditation, ...updatedMeditation } : meditation,
      ),
    })),
  deleteMeditation: (id) =>
    set((state) => ({
      meditations: state.meditations.filter((meditation) => meditation.id !== id),
    })),

  // Actions for programs
  addProgram: (program) => set((state) => ({ programs: [...state.programs, program] })),
  updateProgram: (id, updatedProgram) =>
    set((state) => ({
      programs: state.programs.map((program) => (program.id === id ? { ...program, ...updatedProgram } : program)),
    })),
  deleteProgram: (id) =>
    set((state) => ({
      programs: state.programs.filter((program) => program.id !== id),
    })),

  // Actions for workouts
  addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
  updateWorkout: (id, updatedWorkout) =>
    set((state) => ({
      workouts: state.workouts.map((workout) => (workout.id === id ? { ...workout, ...updatedWorkout } : workout)),
    })),
  deleteWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((workout) => workout.id !== id),
    })),
}))

export default useStore

