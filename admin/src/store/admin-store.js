import { create } from "zustand"

// Mock data - replace with API calls in a real application
const mockUsers = [
  { id: "u1", name: "John Doe", email: "john@example.com", role: "User", status: "Active", joinDate: "2023-01-15" },
  { id: "u2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2023-02-20" },
  {
    id: "u3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    status: "Inactive",
    joinDate: "2023-03-10",
  },
  {
    id: "u4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-04-05",
  },
  {
    id: "u5",
    name: "Chris Davis",
    email: "chris@example.com",
    role: "User",
    status: "Pending",
    joinDate: "2023-05-12",
  },
]

const mockTrainers = [
  {
    id: "t1",
    name: "Alex Johnson",
    email: "alex@example.com",
    specialization: "Strength",
    clients: 12,
    rating: 4.8,
    joinDate: "2022-11-05",
    bio: "Certified personal trainer with 5 years of experience in strength training and nutrition coaching.",
    certifications: ["NASM CPT", "Precision Nutrition Level 1"],
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t2",
    name: "Maria Garcia",
    email: "maria@example.com",
    specialization: "Yoga",
    clients: 8,
    rating: 4.9,
    joinDate: "2022-12-15",
    bio: "Yoga instructor with 10 years of practice and 5 years of teaching experience.",
    certifications: ["RYT-200", "Yoga Alliance Certified"],
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t3",
    name: "Robert Smith",
    email: "robert@example.com",
    specialization: "Cardio",
    clients: 15,
    rating: 4.6,
    joinDate: "2023-01-20",
    bio: "Former professional athlete specializing in cardio and HIIT training.",
    certifications: ["ACE CPT", "TRX Certified"],
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t4",
    name: "Lisa Chen",
    email: "lisa@example.com",
    specialization: "Nutrition",
    clients: 10,
    rating: 4.7,
    joinDate: "2023-02-10",
    bio: "Registered dietitian with expertise in meal planning and nutritional coaching.",
    certifications: ["Registered Dietitian", "Sports Nutrition Specialist"],
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "t5",
    name: "David Wilson",
    email: "david@example.com",
    specialization: "Flexibility",
    clients: 7,
    rating: 4.5,
    joinDate: "2023-03-25",
    bio: "Specializes in mobility training and flexibility improvement techniques.",
    certifications: ["NSCA CSCS", "Functional Range Conditioning"],
    profileImage: "/placeholder.svg?height=200&width=200",
  },
]

const mockStats = {
  totalUsers: 1250,
  totalTrainers: 85,
  activeUsers: 980,
  newUsersThisMonth: 120,
  revenue: 45600,
  totalWorkouts: 320,
  totalMeals: 180,
  totalMeditations: 95,
  totalPrograms: 42,
  userGrowth: [
    { month: "Jan", users: 850 },
    { month: "Feb", users: 940 },
    { month: "Mar", users: 1020 },
    { month: "Apr", users: 1080 },
    { month: "May", users: 1150 },
    { month: "Jun", users: 1250 },
  ],
  trainerGrowth: [
    { month: "Jan", trainers: 50 },
    { month: "Feb", trainers: 58 },
    { month: "Mar", trainers: 65 },
    { month: "Apr", trainers: 72 },
    { month: "May", trainers: 78 },
    { month: "Jun", trainers: 85 },
  ],
  usersByPlan: [
    { name: "Free", value: 450 },
    { name: "Basic", value: 520 },
    { name: "Premium", value: 280 },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 28000 },
    { month: "Feb", revenue: 32000 },
    { month: "Mar", revenue: 36500 },
    { month: "Apr", revenue: 39000 },
    { month: "May", revenue: 42000 },
    { month: "Jun", revenue: 45600 },
  ],
  contentCreation: [
    { month: "Jan", workouts: 40, meals: 25, meditations: 15 },
    { month: "Feb", workouts: 45, meals: 30, meditations: 18 },
    { month: "Mar", workouts: 55, meals: 35, meditations: 20 },
    { month: "Apr", workouts: 60, meals: 30, meditations: 12 },
    { month: "May", workouts: 50, meals: 35, meditations: 15 },
    { month: "Jun", workouts: 70, meals: 25, meditations: 15 },
  ],
}

// Admin store with Zustand
export const useAdminStore = create((set) => ({
  // State
  users: mockUsers,
  trainers: mockTrainers,
  stats: mockStats,
  isLoading: false,
  error: null,

  // User CRUD operations
  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/users')
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      set({ users: mockUsers, isLoading: false })
    } catch (error) {
      set({ error: "Failed to fetch users", isLoading: false })
      console.error("Error fetching users:", error)
    }
  },

  addUser: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/users', {
      //   method: 'POST',
      //   body: JSON.stringify(userData)
      // })
      // const newUser = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const newUser = {
        id: `u${Date.now()}`,
        ...userData,
        joinDate: new Date().toISOString().split("T")[0],
      }

      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false,
      }))

      return newUser
    } catch (error) {
      set({ error: "Failed to add user", isLoading: false })
      console.error("Error adding user:", error)
      throw error
    }
  },

  updateUser: async (userId, userData) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/users/${userId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(userData)
      // })
      // const updatedUser = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      set((state) => ({
        users: state.users.map((user) => (user.id === userId ? { ...user, ...userData } : user)),
        isLoading: false,
      }))

      return { id: userId, ...userData }
    } catch (error) {
      set({ error: "Failed to update user", isLoading: false })
      console.error("Error updating user:", error)
      throw error
    }
  },

  deleteUser: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/admin/users/${userId}`, {
      //   method: 'DELETE'
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        isLoading: false,
      }))

      return { success: true }
    } catch (error) {
      set({ error: "Failed to delete user", isLoading: false })
      console.error("Error deleting user:", error)
      throw error
    }
  },

  // Trainer CRUD operations
  fetchTrainers: async () => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/trainers')
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      set({ trainers: mockTrainers, isLoading: false })
    } catch (error) {
      set({ error: "Failed to fetch trainers", isLoading: false })
      console.error("Error fetching trainers:", error)
    }
  },

  addTrainer: async (trainerData) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/trainers', {
      //   method: 'POST',
      //   body: JSON.stringify(trainerData)
      // })
      // const newTrainer = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const newTrainer = {
        id: `t${Date.now()}`,
        ...trainerData,
        clients: 0,
        rating: 0,
        joinDate: new Date().toISOString().split("T")[0],
        profileImage: "/placeholder.svg?height=200&width=200",
      }

      set((state) => ({
        trainers: [...state.trainers, newTrainer],
        isLoading: false,
      }))

      return newTrainer
    } catch (error) {
      set({ error: "Failed to add trainer", isLoading: false })
      console.error("Error adding trainer:", error)
      throw error
    }
  },

  updateTrainer: async (trainerId, trainerData) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/trainers/${trainerId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(trainerData)
      // })
      // const updatedTrainer = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      set((state) => ({
        trainers: state.trainers.map((trainer) =>
          trainer.id === trainerId ? { ...trainer, ...trainerData } : trainer,
        ),
        isLoading: false,
      }))

      return { id: trainerId, ...trainerData }
    } catch (error) {
      set({ error: "Failed to update trainer", isLoading: false })
      console.error("Error updating trainer:", error)
      throw error
    }
  },

  deleteTrainer: async (trainerId) => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/admin/trainers/${trainerId}`, {
      //   method: 'DELETE'
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      set((state) => ({
        trainers: state.trainers.filter((trainer) => trainer.id !== trainerId),
        isLoading: false,
      }))

      return { success: true }
    } catch (error) {
      set({ error: "Failed to delete trainer", isLoading: false })
      console.error("Error deleting trainer:", error)
      throw error
    }
  },
  

  // Dashboard stats
  fetchStats: async () => {
    set({ isLoading: true, error: null })
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/stats')
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      set({ stats: mockStats, isLoading: false })
    } catch (error) {
      set({ error: "Failed to fetch stats", isLoading: false })
      console.error("Error fetching stats:", error)
    }
  },
}))

