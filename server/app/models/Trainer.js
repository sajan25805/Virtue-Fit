import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    },
    password: { type: String, required: true },
    specialization: { 
      type: String, 
      enum: ["Fitness", "Nutrition", "Meditation", "Yoga"],
      required: true 
    },
    bio: { type: String, maxlength: 500 },
    // certifications: {type: Array},
    role: {type:String, default:"trainer"},
    profilePicture: { type: String }, // Cloudinary URL
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

export const Trainer = mongoose.model('Trainer', trainerSchema);


