
import { User } from '../models/User.js';
import { Trainer } from '../models/Trainer.js';
import { Program } from '../models/Program.js';
import { Workout } from '../models/Workout.js';
import { Notification } from '../models/Notification.js';
import { Admin } from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TRAINERS
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().select('-password');
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTrainer = async (req, res) => {
  try {
    const updated = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Trainer not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTrainer = async (req, res) => {
  try {
    const deleted = await Trainer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Trainer not found' });
    res.json({ message: 'Trainer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PROGRAMS
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate('trainer', 'name email');
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const updated = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Program not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Program not found' });
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// WORKOUTS
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate('trainer', 'name');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutReviews = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('reviews.user', 'firstName lastName');
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkoutReview = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    workout.reviews.id(req.params.reviewId)?.remove();
    await workout.save();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NOTIFICATIONS
export const sendGlobalNotification = async (req, res) => {
  try {
    const { title, message, type, link } = req.body;
    const users = await User.find();
    const payload = users.map(u => ({ user: u._id, title, message, type, link }));
    await Notification.insertMany(payload);
    res.json({ message: 'Notification sent to all users' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD
export const getAdminStats = async (req, res) => {
  try {
    const [userCount, trainerCount, workoutCount, programCount] = await Promise.all([
      User.countDocuments(),
      Trainer.countDocuments(),
      Workout.countDocuments(),
      Program.countDocuments(),
    ]);
    res.json({
      totalUsers: userCount,
      totalTrainers: trainerCount,
      totalWorkouts: workoutCount,
      totalPrograms: programCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: admin._id }, config.jwtSecret, { expiresIn: '7d' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Admin login successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashed,
      role: "admin",
    });

    res.status(201).json({ message: "Admin created", adminId: newAdmin._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN LOGOUT
export const logoutAdmin = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Admin logged out successfully" });
};

// CHECK ADMIN AUTH
export const checkAdminAuth = (req, res) => {
  if (req.role === 'admin') {
    res.json({ admin: { _id: req.userId, role: 'admin' } });
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};
