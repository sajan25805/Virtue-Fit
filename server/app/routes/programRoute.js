import express from "express";
import {
  createProgram,
  getPrograms,
  getProgramById,
  enrollInProgram,
  markProgramItemComplete,
  getUserProgramProgress,
  updateProgram,
  deleteProgram
} from "../controllers/program.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public
router.get("/", getPrograms);
router.get("/:id", getProgramById);

// ✅ Protected (User)
router.post("/:programId/enroll", protect, enrollInProgram);
router.patch("/:programId/complete", protect, markProgramItemComplete);
router.get("/:programId/progress", protect, getUserProgramProgress);

// ✅ Trainer Only
router.post("/", protect, createProgram);
router.patch("/:id", protect, updateProgram);     
router.delete("/:id", protect, deleteProgram);     


export default router;

