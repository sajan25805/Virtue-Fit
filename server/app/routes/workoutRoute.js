import { Router } from "express";
import {
createWorkout,
    deleteWorkout,
getAllWorkouts,
getWorkoutById,
getWorkoutsByTrainer,
updateWorkout,
} from "../controllers/workout.js"

const router = Router();

router.post("/", createWorkout);
router.get("/", getAllWorkouts); // Get all workouts
router.get("/trainer/:trainerId", getWorkoutsByTrainer);
router.get("/:id",getWorkoutById);
router.put("/:id",updateWorkout);
router.delete("/:id",deleteWorkout)

export { router as workoutRoute };
