import express from "express";
import { createNotification, getUserNotifications, markNotificationAsRead, clearAllNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNotification);
router.get("/", protect, getUserNotifications);
router.patch("/:notificationId/read", protect, markNotificationAsRead);
router.delete("/clear-all", protect, clearAllNotifications);


export default router;
