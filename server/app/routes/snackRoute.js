import { Router } from "express";
import {
  createSnack,
  getAllSnacks,
  getSnacksByTrainer,
  getSnackById,
  updateSnack,
  deleteSnack
} from "../controllers/snack.js";

import { upload } from '../middleware/multer.js';

const router = Router();

// Create snack with thumbnail upload
router.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }
  ]),
  createSnack
);

// Get all snacks (with optional filters if added later)
router.get("/", getAllSnacks);

// Get snacks by trainer ID
router.get("/trainer/:trainerId", getSnacksByTrainer);

// Get snack by ID
router.get("/:id", getSnackById);

// Update snack with thumbnail upload
router.put(
  "/:id",
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }
  ]),
  updateSnack
);

// Delete snack
router.delete("/:id", deleteSnack);

export { router as snackRoute };
