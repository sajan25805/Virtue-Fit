import express from "express";
import { startWorkout, completeWorkout, getUserWorkoutProgress } from "../controllers/workoutProgressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start", protect, startWorkout);
router.patch("/complete/:workoutProgressId", protect, completeWorkout);
router.get("/user", protect, getUserWorkoutProgress); 


export default router;
