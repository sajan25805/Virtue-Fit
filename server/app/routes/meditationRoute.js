import { Router } from "express";
import {
  createMeditation,
  getMeditationsByTrainer,
  getMeditationById,
  updateMeditation,
  deleteMeditation,
  getMeditations
} from "../controllers/meditation.js";
import { upload } from '../middleware/multer.js';

const router = Router();

router.post(
  '/',
  upload.fields([
    { name: 'audioUrl', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  createMeditation
);

// Get all meditations
router.get("/", getMeditations);

// Get meditations by trainer ID
router.get("/trainer/:trainerId", getMeditationsByTrainer);

// Get meditation by ID
router.get("/:id", getMeditationById);

// Update meditation by ID
router.put("/:id", upload.fields([
  { name: 'audioUrl', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), updateMeditation);

// Delete meditation by ID
router.delete("/:id", deleteMeditation);

export { router as meditationRoute };
