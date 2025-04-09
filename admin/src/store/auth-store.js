// import { create } from 'zustand';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// axios.defaults.baseURL = 'http://localhost:8000/api'; // Your backend API URL

// export const useAuthStore = create((set) => ({
//   trainer: null,
//   isLoading: false,
//   error: null,
//   isVerified: false,

//   // Trainer Login
//   login: async (credentials) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post('/trainers/login', credentials);
//       localStorage.setItem('trainerToken', response.data.token);
//       set({ 
//         trainer: response.data.trainer,
//         isVerified: response.data.trainer.isVerified,
//         isLoading: false 
//       });
//       return response.data;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Login failed',
//         isLoading: false 
//       });
//       throw error;
//     }
//   },

//   // // Trainer Signup
//   // signup: async (trainerData) => {
//   //   set({ isLoading: true, error: null });
//   //   try {
//   //     const response = await axios.post('/trainers', trainerData);
//   //     set({ isLoading: false });
//   //     return response.data;
//   //   } catch (error) {
//   //     set({ 
//   //       error: error.response?.data?.message || 'Registration failed',
//   //       isLoading: false 
//   //     });
//   //     throw error;
//   //   }
//   // },


//   signup: async (formData) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post('/trainers', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       set({ isLoading: false });
//       return response.data;
//     } catch (error) {
//       set({ 
//         isLoading: false, 
//         error: error.response?.data?.message || 'Signup failed' 
//       });
//       throw error;
//     }
//   },
  

//   // Verify Email
//   verifyEmail: async (token) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post('/trainers/verify-email', { token });
//       set({ 
//         trainer: response.data.trainer,
//         isVerified: true,
//         isLoading: false 
//       });
//       return response.data;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Verification failed',
//         isLoading: false 
//       });
//       throw error;
//     }
//   },

//   // Password Reset Request
//   requestPasswordReset: async (email) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post('/trainers/request-password-reset', { email });
//       set({ isLoading: false });
//       return response.data;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Password reset request failed',
//         isLoading: false 
//       });
//       throw error;
//     }
//   },

//   // Reset Password
//   resetPassword: async ({ token, newPassword }) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post('/trainers/reset-password', { token, newPassword });
//       set({ isLoading: false });
//       return response.data;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Password reset failed',
//         isLoading: false 
//       });
//       throw error;
//     }
//   },

//   // Logout
//   logout: () => {
//     localStorage.removeItem('trainerToken');
//     set({ trainer: null, isVerified: false });
//   },

//   // Check auth status
//   checkAuth: async () => {
//     set({ isLoading: true });
//     try {
//       const token = localStorage.getItem('trainerToken');
//       if (!token) return set({ isLoading: false });

//       const response = await axios.get('/trainers/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       set({ 
//         trainer: response.data,
//         isVerified: response.data.isVerified,
//         isLoading: false 
//       });
//     } catch (error) {
//       localStorage.removeItem('trainerToken');
//       set({ 
//         error: error.response?.data?.message || 'Authentication check failed',
//         isLoading: false 
//       });
//     }
//   }
// }));



import { create } from 'zustand';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api'; // Your backend API URL

export const useAuthStore = create((set) => ({
  trainer: null,
  isLoading: false,
  error: null,
  isVerified: false,

  // Trainer Login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/trainers/login', credentials);
      localStorage.setItem('trainerToken', response.data.token);
      set({ 
        trainer: response.data.trainer,
        isVerified: response.data.trainer.isVerified,
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // ✅ Trainer Signup using axios + FormData
  signup: async ({ name, email, password, specialization, bio, profilePicture }) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('specialization', specialization);
      formData.append('bio', bio);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture); // Must match backend field
      }

      const response = await axios.post('/trainers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Verify Email
  verifyEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/trainers/verify-email', { token });
      set({ 
        trainer: response.data.trainer,
        isVerified: true,
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Verification failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Password Reset Request
  requestPasswordReset: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/trainers/request-password-reset', { email });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Password reset request failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Reset Password
  resetPassword: async ({ token, newPassword }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/trainers/reset-password', { token, newPassword });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Password reset failed',
        isLoading: false 
      });
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('trainerToken');
    set({ trainer: null, isVerified: false });
  },

  // Check auth status
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('trainerToken');
      if (!token) return set({ isLoading: false });

      const response = await axios.get('/trainers/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ 
        trainer: response.data,
        isVerified: response.data.isVerified,
        isLoading: false 
      });
    } catch (error) {
      localStorage.removeItem('trainerToken');
      set({ 
        error: error.response?.data?.message || 'Authentication check failed',
        isLoading: false 
      });
    }
  }
}));
