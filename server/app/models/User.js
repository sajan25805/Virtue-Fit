// models/User.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      enum: ['Super Admin', 'Trainer', 'User'],
      required: true,
      default: 'User',
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: /^\+?\d{7,15}$/,
    },
    profilePicture: { type: String, default: '' },
    age: { type: Number, min: 13, max: 100 },
    height: { type: Number, min: 50, max: 250 },
    weight: { type: Number, min: 20, max: 300 },
    fitnessGoal: { type: String, trim: true },
    experienceLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'Beginner' },
    fitnessGoals: {
      type: [String],
      enum: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'General Fitness'],
      default: ['General Fitness'],
    },
    subscription: {
      type: String,
      enum: ['Free', 'Premium'],
      default: 'Free',
    },
    subscriptionDetails: {
      expiryDate: { type: Date, default: null },
      paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Expired'], default: 'Pending' },
    },
    preferredLanguage: { type: String, default: 'en' },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, match: /^\d{4,10}$/ },
    },
    isActive: { type: Boolean, default: true },
    isVerified: {type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
  },
  { timestamps: true }
);

export const User =  model('User', userSchema);

