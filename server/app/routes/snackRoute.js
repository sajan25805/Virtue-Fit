import { Router } from "express";

import {
    createSnack,
    getAllSnacks,
    getSnacksByTrainer,
    getSnackById,
    updateSnack,
    deleteSnack
  } from "../controllers/snackController.js";
  
  const router = express.Router();
  
  router.post("/", createSnack);
  router.get("/", getAllSnacks); // Get all snacks
  router.get("/trainer/:trainerId", getSnacksByTrainer);
  router.get("/:id", getSnackById);  
  router.put("/:id", updateSnack);  
  router.delete("/:id", deleteSnack);

export { router as snackRoute };

