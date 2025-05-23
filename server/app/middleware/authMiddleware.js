import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Trainer } from "../models/Trainer.js";
import { Admin } from "../models/Admin.js"; // ✅ Import Admin model
import config from "../config/config.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    // Try Admin
    const admin = await Admin.findById(decoded.userId);
    if (admin) {
      req.userId = admin._id;
      req.role = "admin";
      return next();
    }

    // Try User
    const user = await User.findById(decoded.userId);
    if (user) {
      req.userId = user._id;
      req.role = "user";
      return next();
    }

    // Try Trainer
    const trainer = await Trainer.findById(decoded.userId);
    if (trainer) {
      req.userId = trainer._id;
      req.role = "trainer";
      return next();
    }

    return res.status(401).json({ success: false, message: "User not found" });
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

export const adminProtect = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
