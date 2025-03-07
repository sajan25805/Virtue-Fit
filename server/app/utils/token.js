import jwt from "jsonwebtoken";
import config from "../config/config.js";

/**
 * Create  verificationToken and verificationTokenExpiresAt
 * @returns  Object
 */
export const generateVerificationCode = () => {
  const verificationToken = Math.floor(Math.random() * 1000000).toString();
  const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

  return {
    verificationToken,
    verificationTokenExpiresAt,
  };
};

/**
 * Generates a JWT token and sets it as an HTTP-only cookie in the response.
 *
 * @param {import("express").Response} res - Express response object to set the cookie.
 * @param {string} userId - The user ID to include in the JWT payload.
 * @returns {string} The generated JWT token.
 */
export const generateTokenAndSetCookie = (res, userId) => {
    const { jwtSecret, nodeEnv } = config;
  
    if (!jwtSecret) {
      throw new Error("JWT secret is missing in config.");
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
  
    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: nodeEnv === "production", // Ensures HTTPS in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
  
    return token;
  };

  