// utils/notifyUsers.js
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";

export const notifyAllUsers = async ({ title, message, type, link }) => {
  try {
    const users = await User.find({ isActive: true }, "_id");
    const notifications = users.map(user => ({
      user: user._id,
      title,
      message,
      type,
      link
    }));
    await Notification.insertMany(notifications);
  } catch (err) {
    console.error("Error sending notifications to users:", err.message);
  }
};
