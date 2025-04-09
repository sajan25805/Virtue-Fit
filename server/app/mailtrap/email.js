import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  Send_Welcome_Email_Template
} from "./emailtemplates.js";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP host
  port: 587, // Use appropriate port (587 for TLS, 465 for SSL)
  secure: false, // Set to true if using SSL
  auth: {
    user: "np03cs4s230168@heraldcollege.edu.np", // Replace with your email
    pass: "gcaqztyvedqfgvbl", // Replace with your email password or app password
  },
});

const sender = "np03cs4s230168@heraldcollege.edu.np"; // Replace with your sender email

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    });

    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};
export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to Virtue Fit!",
      html: Send_Welcome_Email_Template.replace("{name}", name),
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Error sending welcome email");
  }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error("Error sending password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error("Error sending password reset success email");
  }
};
