import express from "express";
import {
  getPlanner,
  generatePlanner,
  markPlannerItemComplete,
  updatePlannerItemDate
} from "../controllers/Planner.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Fetch planner items for logged-in user
router.get("/", protect, getPlanner);

// ✅ Generate planner items when enrolling in a program
router.post("/:programId/generate", protect, generatePlanner);

// ✅ Mark planner item as completed
router.patch("/complete/:itemId", protect, markPlannerItemComplete);

// ✅ Update planner item date (for drag-and-drop rescheduling)
router.patch("/reschedule/:itemId", protect, updatePlannerItemDate);

export default router;
