import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Trainer } from "../models/Trainer.js";
import config from "../config/config.js"; // if you have a config, or replace with your jwt secret

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // You are using cookies for token

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, config.jwtSecret); // or replace with your hardcoded JWT secret

    // Check if user exists
    const user = await User.findById(decoded.userId);

    if (!user) {
      // Check if Trainer
      const trainer = await Trainer.findById(decoded.userId);

      if (!trainer) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      req.userId = trainer._id;
      req.role = "trainer";
    } else {
      req.userId = user._id;
      req.role = "user";
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
