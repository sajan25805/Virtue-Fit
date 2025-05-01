import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';
import {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  rateWorkout,
  addWorkoutReview,
  getWorkoutReviews,
  updateWorkoutReview,
  deleteWorkoutReview
} from '../controllers/workout.js';

const router = express.Router();


// Rate a workout
router.patch("/rate/:workoutId", protect, rateWorkout);

// Review a Workout
router.post('/:id/review', protect, addWorkoutReview);
router.get('/:id/reviews', getWorkoutReviews);
router.put('/:id/review/:reviewId', protect, updateWorkoutReview);
router.delete('/:id/review/:reviewId', protect, deleteWorkoutReview);


// Upload Video + Thumbnail
router.post(
  '/',
  protect,
  upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
  createWorkout
);

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);

router.put(
  '/:id',
  protect,
  upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
  updateWorkout
);

router.delete('/:id', protect, deleteWorkout);

export { router as workoutRoute };


