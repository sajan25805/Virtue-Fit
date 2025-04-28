import express from 'express';

import { createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout, rateWorkout } from '../controllers/workout.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();


// ⭐ Route for Rating
router.patch("/rate/:workoutId", protect, rateWorkout);

router.post(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  createWorkout
);

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.put(
  '/:id',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  updateWorkout
);
router.delete('/:id',deleteWorkout);

export { router as workoutRoute };



