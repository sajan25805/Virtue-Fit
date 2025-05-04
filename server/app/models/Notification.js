import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ['system', 'workout', 'subscription', 'other'], default: 'system' },
    link: { type: String }
  },
  { timestamps: true }
);

export const Notification = model('Notification', notificationSchema);



