import { create } from 'zustand';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

export const useAuthStore = create((set) => ({
  trainer: null,
  isLoading: false,
  error: null,
  isVerified: false,

  // // Trainer Login
  // login: async (credentials) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.post('/trainers/login', credentials);
      
  //     // No need to handle token manually - it's in cookies
  //     set({ 
  //       trainer: response.data.trainer,
  //       isVerified: response.data.trainer.isVerified,
  //       isLoading: false 
  //     });
  //     console.log("Login response:", response.data); // Check what's in the response

  //     return response.data;
  //   } catch (error) {
  //     set({ 
  //       error: error.response?.data?.message || 'Login failed',
  //       isLoading: false 
  //     });
  //     throw error;
  //   }
  // },


  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/trainers/login', credentials);
      
      // Save trainer to localStorage
      localStorage.setItem('trainer', JSON.stringify(response.data.trainer));
  
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



  // Trainer Signup
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
        formData.append('profilePicture', profilePicture);
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
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/verify-email', {code});
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
  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post('/trainers/logout');
      set({ 
        trainer: null, 
        isVerified: false,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Logout failed',
        isLoading: false 
      });
      throw error;
    }
  },





}));



  // // Check auth status
  // checkAuth: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await axios.get('/trainers/me');
  //     set({ 
  //       trainer: response.data,
  //       isVerified: response.data.isVerified,
  //       isLoading: false 
  //     });
  //     return response.data;
  //   } catch (error) {
  //     set({ 
  //       error: error.response?.data?.message || 'Authentication check failed',
  //       isLoading: false,
  //       trainer: null,
  //       isVerified: false
  //     });
  //     return null;
  //   }
  // },