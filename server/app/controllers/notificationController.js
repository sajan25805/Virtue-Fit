import { Notification } from "../models/Notification.js";

export const createNotification = async (req, res) => {
  try {

    const { title, message, type, link } = req.body;

    const notification = await Notification.create({
      user: req.userId, 
      title,
      message,
      type,
      link
    });
    

    res.status(201).json({ success: true, message: "Notification created", notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });

    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const clearAllNotifications = async (req, res) => {
    try {
      await Notification.deleteMany({ user: req.userId });
      res.status(200).json({ success: true, message: "All notifications cleared" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };