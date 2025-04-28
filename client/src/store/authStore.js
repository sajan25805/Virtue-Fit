// import { create } from "zustand";
// import axios from "axios";

// const API_URL = "http://localhost:8000/api";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   error: null,
//   isLoading: false,

//   signup: async (userData) => {
//     set({ isLoading: true, error: null });

//     try {
//       const response = await axios.post(`${API_URL}/auth/signup`, userData);
//       set({ user: response.data.user, isAuthenticated: true, isLoading: false });
//     } catch (error) {
//       set({ error: error.response?.data?.message || "Error Signing Up", isLoading: false });
//       throw error;
//     }
//   },

//   login: async (userData) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/auth/login`,userData );
// 			set({
// 				isAuthenticated: true,
// 				user: response.data.user,
// 				error: null,
// 				isLoading: false,
// 			});
// 		} catch (error) {
// 			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
// 			throw error;
// 		}
// 	},

// 	logout: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			await axios.post(`${API_URL}/logout`);
// 			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
// 		} catch (error) {
// 			set({ error: "Error logging out", isLoading: false });
// 			throw error;
// 		}
// 	},

//   verifyEmail: async (code) => {
//     set({isLoading:true, error: null});

//     try {

//       const response = await axios.post(`${API_URL}/auth/verify-email`,{code});
//       set({user:response.data.user, isAuthenticated: true, isLoading: false});
//       return response.data

//     }
//     catch(error) {
//       set({error: error.response.data.message || "Error Verifying Email", isLoading:false})
//       throw error;
//     }
//   },

//   checkAuth: async (code) => {
//     set({isLoading:true, error: null});

//     try {
//       const response = await axios.get(`${API_URL}/check-auth`)
//     }

//     catch(error) {

//     }

//   }


// }));



import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        withCredentials: true, // ADD THIS
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error Signing Up", isLoading: false });
      throw error;
    }
  },

  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData, {
        withCredentials: true, // ADD THIS
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true, // ADD THIS
      });
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, { code }, {
        withCredentials: true, // ADD THIS
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error Verifying Email", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true, // ADD THIS
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Check auth failed", error);
    }
  }
}));
