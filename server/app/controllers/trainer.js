import { Trainer } from '../models/Trainer.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../mailtrap/email.js';
import { generateTokenAndSetCookie, generateVerificationCode } from '../utils/token.js'; // Optional

export const registerTrainer = async (req, res) => {
  try {
    const { file } = req;
    let profilePictureUrl = '';

    const { name, email, password, specialization, bio } = req.body;

    // Check if trainer already exists
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({
        success: false,
        message: 'Trainer already exists.',
      });
    }

    // Upload profile picture to Cloudinary
    if (file) {
      profilePictureUrl = await uploadToCloudinary(file.path, 'image');
      fs.unlinkSync(file.path); // Remove temp file
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const { verificationToken, verificationTokenExpiresAt } = generateVerificationCode();

    // Create trainer
    const trainer = await Trainer.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      bio,
      profilePicture: profilePictureUrl,
      verificationToken,
      verificationTokenExpiresAt
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Optional: create token and set cookie
    generateTokenAndSetCookie(res, trainer._id);

    return res.status(201).json({
      success: true,
      message: 'Trainer registered successfully. Please verify your email.',
      trainer: {
        _id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        specialization: trainer.specialization,
        profilePicture: trainer.profilePicture,
        isVerified: trainer.isVerified,
      },
    });
  } catch (error) {
    console.error('Error registering trainer:', error);
    res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};




// controllers/trainer.js
export const loginTrainer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if trainer exists
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if account is active
    if (!trainer.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.',
      });
    }

    // Check if account is verified
    if (!trainer.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in.',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    trainer.lastLogin = Date.now();
    await trainer.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(res, trainer._id);

    // Return response without sensitive data
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      trainer: {
        _id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        specialization: trainer.specialization,
        profilePicture: trainer.profilePicture,
        isVerified: trainer.isVerified,
        role: trainer.role,
      },
    });

  } catch (error) {
    console.error('Error logging in trainer:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};



export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().select('-password');
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).select('-password');
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTrainer = async (req, res) => {
  try {
    const { file } = req;
    const updates = { ...req.body };

    if (file) {
      updates.profilePicture = await uploadToCloudinary(file.path, 'image');
      fs.unlinkSync(file.path);
    }

    const trainer = await Trainer.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).select('-password');

    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json({ message: 'Trainer removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutTrainer = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      // secure: config.nodeEnv === 'production', // use HTTPS only in production
      sameSite: 'Strict',
    });

    res.status(200).json({ success: true, message: 'Trainer logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};