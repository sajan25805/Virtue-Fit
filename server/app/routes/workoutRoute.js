import express from 'express';

import { createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout } from '../controllers/workout.js';

import { upload } from '../middleware/multer.js';

const router = express.Router();



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



