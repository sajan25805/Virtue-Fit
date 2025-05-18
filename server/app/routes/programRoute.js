import express from "express";
import {
  createProgram,
  getPrograms,
  getProgramById,
  enrollInProgram,
  markProgramItemComplete,
  getUserProgramProgress,
  updateProgram,
  deleteProgram,
  recommendNextProgram,
  getEnrolledClients
} from "../controllers/program.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public Routes
router.get("/", getPrograms);
router.get("/:id", getProgramById);

// ✅ User-Protected Routes
router.post("/:programId/enroll", protect, enrollInProgram);
router.patch("/:programId/complete", protect, markProgramItemComplete);
router.get("/:programId/progress", protect, getUserProgramProgress);
router.get("/recommend/next", protect, recommendNextProgram);
router.get("/:id/enrollments", getEnrolledClients);


// ✅ Trainer-Protected Routes
router.post("/", protect, createProgram);
router.patch("/:id", protect, updateProgram);
router.delete("/:id", protect, deleteProgram);

export default router;

