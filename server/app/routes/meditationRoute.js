import { Router } from "express";
import {
    createMeditation,
    getAllMeditations,
    getMeditationsByTrainer,
    getMeditationById,
    updateMeditation,
    deleteMeditation
  } from "../controllers/meditationController.js";
  
  const router = Router();
  
  router.post("/", createMeditation);
  router.get("/", getAllMeditations); // Get all meditations
  router.get("/trainer/:trainerId", getMeditationsByTrainer);
  router.get("/:id",getMeditationById);
  router.put("/:id",updateMeditation);
  router.delete("/:id",deleteMeditation);


export { router as meditationRoute };



