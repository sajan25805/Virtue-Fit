import { Router } from "express";
import {checkAuth, signup, verifyEmail, login, logout, forgotPassword, resetPassword} from "../controllers/auth/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();



/**
 * GET /api/auth/signup
 */
router.post("/check-auth",verifyToken,checkAuth);

router.post("/signup",signup);

router.post("/verify-email",verifyEmail);

router.post("/login",login);

router.post("/logout",logout);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token",resetPassword);



export { router as authRoutes }




