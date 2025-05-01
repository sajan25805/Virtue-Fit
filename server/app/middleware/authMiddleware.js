import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Trainer } from "../models/Trainer.js";
import config from "../config/config.js"; // Contains jwtSecret and other env config

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // 🍪 Read token from cookie

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, config.jwtSecret); // 🔐 Verify token with secret

    // Try finding a regular user
    const user = await User.findById(decoded.userId);

    if (user) {
      req.userId = user._id;
      req.role = "user";
    } else {
      // Try finding a trainer instead
      const trainer = await Trainer.findById(decoded.userId);

      if (!trainer) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      req.userId = trainer._id;
      req.role = "trainer";
    }

    next(); // ✅ All good, proceed to route
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
