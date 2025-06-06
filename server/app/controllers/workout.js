import { Workout } from '../models/Workout.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs';
import { User } from "../models/User.js";
import { notifyAllUsers } from "../utils/notifyUsers.js";

// Helper to safely upload
async function safeUpload(file, type) {
  try {
    const result = await uploadToCloudinary(file, type);
    fs.unlinkSync(file);
    return result;
  } catch (error) {
    console.error(`Cloudinary Upload Error:`, error);
    return "";
  }
}

// ✅ Create Workout
export const createWorkout = async (req, res) => {
  try {
    const { sections } = req.body;

    let videoUrl = "";
    let thumbnailUrl = "";

    if (req.files?.video) {
      videoUrl = await safeUpload(req.files.video[0].path, 'video');
    }
    if (req.files?.thumbnail) {
      thumbnailUrl = await safeUpload(req.files.thumbnail[0].path, 'image');
    }

    const workout = new Workout({
      ...req.body,
      sections: sections ? JSON.parse(sections) : [],
      videoUrl,
      thumbnail: thumbnailUrl
    });

    await workout.save();

    await notifyAllUsers({
      title: "🔥 New Workout Available",
      message: `Check out "${workout.title}" by our trainer.`,
      type: "new-workout",
      link: `/workout/${workout._id}`
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Workout by ID
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('trainer', 'name email profilePicture specialization bio isVerified');

    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const totalRatings = workout.ratings.length;
    const averageRating = totalRatings
      ? (workout.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings).toFixed(1)
      : 0;

    res.status(200).json({ ...workout.toObject(), averageRating, totalRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).populate('trainer', 'name profilePicture specialization bio');
    const enriched = workouts.map(w => {
      const totalRatings = w.ratings.length;
      const averageRating = totalRatings
        ? (w.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings).toFixed(1)
        : 0;
      return { ...w.toObject(), averageRating, totalRatings };
    });
    res.status(200).json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Workout
export const updateWorkout = async (req, res) => {
  try {
    const { sections } = req.body;
    const updates = { ...req.body };

    if (req.files?.video) {
      updates.videoUrl = await safeUpload(req.files.video[0].path, 'video');
    }
    if (req.files?.thumbnail) {
      updates.thumbnail = await safeUpload(req.files.thumbnail[0].path, 'image');
    }
    if (sections) {
      updates.sections = JSON.parse(sections);
    }

    const workout = await Workout.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Review Workout
export const addWorkoutReview = async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  const userId = req.userId;

  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const alreadyReviewed = workout.reviews.find(r => r.user.toString() === userId);
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this workout" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const review = { user: userId, comment, rating };
    workout.reviews.push(review);
    workout.ratings.push({ user: userId, rating });

    await workout.save();
    res.status(201).json({ success: true, message: "Review added", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Review
export const updateWorkoutReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.userId;

  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const review = workout.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    review.comment = comment || review.comment;
    review.rating = rating || review.rating;
    review.createdAt = Date.now();

    await workout.save();
    res.status(200).json({ success: true, message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Review
export const deleteWorkoutReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const userId = req.userId;

  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const review = workout.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    review.remove();
    await workout.save();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Rate Workout
export const rateWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { rating } = req.body;
    const userId = req.userId;

    const workout = await Workout.findById(workoutId);
    if (!workout) return res.status(404).json({ success: false, message: "Workout not found" });

    const existing = workout.ratings.find(r => r.user.toString() === userId);
    if (existing) {
      existing.rating = rating;
    } else {
      workout.ratings.push({ user: userId, rating });
    }

    await workout.save();
    res.status(200).json({ success: true, message: "Workout rated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Reviews
export const getWorkoutReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id).populate({
      path: 'reviews.user',
      select: 'firstName lastName profilePicture _id'
    });
    if (!workout) return res.status(404).json({ success: false, message: "Workout not found" });

    res.status(200).json({ success: true, reviews: workout.reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
