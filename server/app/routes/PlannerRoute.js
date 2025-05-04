import express from "express";
import {
  generatePlanner,
  getPlanner,
  markPlannerItemComplete
} from "../controllers/planner.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPlanner);
router.post("/:programId/generate", protect, generatePlanner);
router.patch("/complete/:itemId", protect, markPlannerItemComplete);

export default router;
