import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllTrainers,
  updateTrainer,
  deleteTrainer,
  getAdminStats,
  getAllPrograms,
  deleteProgram,
  updateProgram,
  getAllWorkouts,
  deleteWorkout,
  getWorkoutReviews,
  deleteWorkoutReview,
  sendGlobalNotification,
  loginAdmin,
  logoutAdmin,
  checkAdminAuth,
  createAdmin
} from '../controllers/adminController.js';

import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post("/create-admin", createAdmin);
router.get('/check-auth', protect, adminProtect, checkAdminAuth);

// Apply protection for all admin-only routes
router.use(protect, adminProtect);

// Users
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Trainers
router.get('/trainers', getAllTrainers);
router.patch('/trainers/:id', updateTrainer);
router.delete('/trainers/:id', deleteTrainer);

// Programs
router.get('/programs', getAllPrograms);
router.patch('/programs/:id', updateProgram);
router.delete('/programs/:id', deleteProgram);

// Workouts
router.get('/workouts', getAllWorkouts);
router.delete('/workouts/:id', deleteWorkout);
router.get('/workouts/:id/reviews', getWorkoutReviews);
router.delete('/workouts/:id/review/:reviewId', deleteWorkoutReview);

// Notifications
router.post('/notifications', sendGlobalNotification);

// Dashboard stats
router.get('/stats', getAdminStats);

export default router;
