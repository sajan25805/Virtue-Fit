import { Router } from "express";
import {
  checkAuth,
  signup,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  deleteAccount,
  updatePassword
} from "../controllers/auth/auth.js";

import { protect } from "../middleware/authMiddleware.js"; // or protect.js if renamed
import { resendVerificationEmail } from "../controllers/auth/auth.js";
import { upload } from '../middleware/multer.js';

const router = Router();

/**
 * Auth Routes
 */

// ✅ Only for authenticated users
router.get("/check-auth", protect, checkAuth);
router.post("/logout", protect, logout);

router.patch("/update-profile", protect, upload.single("profilePicture"), updateProfile);
router.delete("/delete-account", protect, deleteAccount);


router.patch("/change-password", protect, updatePassword);



// ❌ Public routes (no token needed)
router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/resend-verification-email", resendVerificationEmail); 


export { router as authRoutes };
