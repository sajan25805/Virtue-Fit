import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  profilePicture: { type: String },
  isSuperAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);

