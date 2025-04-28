// // import { Workout } from "../models/Workout.js";

// // // Create Workout
// // export const createWorkout = async (req, res) => {
// //   try {
// //     const workout = new Workout(req.body);
// //     await workout.save();
// //     res.status(201).json({
// //       success: true,
// //       message: "Workout created successfully",
// //       workout: { ...workout._doc },
// //     });
// //   } catch (error) {
// //     res.status(400).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // Get All Workouts
// // export const getAllWorkouts = async (req, res) => {
// //   try {
// //     const workouts = await Workout.find().populate("trainer");
// //     res.status(200).json({
// //       success: true,
// //       message: "Workouts fetched successfully",
// //       workouts,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // Get Workouts by Trainer ID
// // export const getWorkoutsByTrainer = async (req, res) => {
// //   try {
// //     const workouts = await Workout.find({ trainer: req.params.trainerId }).populate("trainer");
// //     res.status(200).json({
// //       success: true,
// //       message: "Workouts by trainer fetched successfully",
// //       workouts,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // Get Workout by ID
// // export const getWorkoutById = async (req, res) => {
// //   try {
// //     const workout = await Workout.findById(req.params.id).populate("trainer");
// //     if (!workout) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Workout not found",
// //       });
// //     }
// //     res.status(200).json({
// //       success: true,
// //       message: "Workout fetched successfully",
// //       workout,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // Update Workout
// // export const updateWorkout = async (req, res) => {
// //   try {
// //     const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     if (!workout) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Workout not found",
// //       });
// //     }
// //     res.status(200).json({
// //       success: true,
// //       message: "Workout updated successfully",
// //       workout,
// //     });
// //   } catch (error) {
// //     res.status(400).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // Delete Workout
// // export const deleteWorkout = async (req, res) => {
// //   try {
// //     const workout = await Workout.findByIdAndDelete(req.params.id);
// //     if (!workout) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Workout not found",
// //       });
// //     }
// //     res.status(200).json({
// //       success: true,
// //       message: "Workout deleted successfully",
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// import { Workout } from '../models/Workout.js';

// // Create Workout
// export const createWorkout = async (req, res) => {
//   try {
//     const { videoUrl, thumbnail } = req.files;  // Destructure the files
//     const workoutData = {
//       ...req.body,  // All other form data like name, description, etc.
//       videoUrl: videoUrl[0].path,  // Save video file path
//       thumbnail: thumbnail[0].path,  // Save thumbnail file path
//     };

//     const workout = new Workout(workoutData);
//     await workout.save();
//     res.status(201).json({
//       success: true,
//       message: 'Workout created successfully',
//       workout: { ...workout._doc },
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get All Workouts
// export const getAllWorkouts = async (req, res) => {
//   try {
//     const workouts = await Workout.find().populate('trainer');
//     res.status(200).json({
//       success: true,
//       message: 'Workouts fetched successfully',
//       workouts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get Workouts by Trainer ID
// export const getWorkoutsByTrainer = async (req, res) => {
//   try {
//     const workouts = await Workout.find({ trainer: req.params.trainerId }).populate('trainer');
//     res.status(200).json({
//       success: true,
//       message: 'Workouts by trainer fetched successfully',
//       workouts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get Workout by ID
// export const getWorkoutById = async (req, res) => {
//   try {
//     const workout = await Workout.findById(req.params.id).populate('trainer');
//     if (!workout) {
//       return res.status(404).json({
//         success: false,
//         message: 'Workout not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Workout fetched successfully',
//       workout,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Update Workout
// export const updateWorkout = async (req, res) => {
//   try {
//     const { videoUrl, thumbnail } = req.files;
//     const workoutData = {
//       ...req.body,
//       ...(videoUrl && { videoUrl: videoUrl[0].path }),
//       ...(thumbnail && { thumbnail: thumbnail[0].path }),
//     };

//     const workout = await Workout.findByIdAndUpdate(req.params.id, workoutData, { new: true });
//     if (!workout) {
//       return res.status(404).json({
//         success: false,
//         message: 'Workout not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Workout updated successfully',
//       workout,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Delete Workout
// export const deleteWorkout = async (req, res) => {
//   try {
//     const workout = await Workout.findByIdAndDelete(req.params.id);
//     if (!workout) {
//       return res.status(404).json({
//         success: false,
//         message: 'Workout not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Workout deleted successfully',
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





import { Workout } from '../models/Workout.js'
import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs';

export const createWorkout = async (req, res) => {
  try {
    const { files } = req;
    let videoUrl = '';
    let thumbnailUrl = '';

    if (files?.video) {
      videoUrl = await uploadToCloudinary(files.video[0].path, 'video');
      fs.unlinkSync(files.video[0].path);
    }

    if (files?.thumbnail) {
      thumbnailUrl = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path);
    }

        // Make sure trainer ID is included in the request body
        if (!req.body.trainer) {
          return res.status(400).json({ message: "Trainer ID is required" });
        }
        
    const workout = new Workout({
      ...req.body,
      videoUrl,
      thumbnail: thumbnailUrl
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const rateWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const { rating } = req.body;
  const userId = req.userId; // From protect middleware

  try {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ success: false, message: "Workout not found" });
    }

    const alreadyRated = workout.ratings.find(r => r.user.toString() === userId);
    if (alreadyRated) {
      return res.status(400).json({ success: false, message: "You already rated this workout" });
    }

    workout.ratings.push({ user: userId, rating });
    await workout.save();

    res.status(200).json({ success: true, message: "Workout rated successfully" });
  } catch (error) {
    console.error("Error rating workout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getWorkouts = async (req, res) => {
  try {
    const { difficulty, aim } = req.query;
    const filter = {};
    
    if (difficulty) filter.difficulty = difficulty;
    if (aim) filter.aim = aim;

    const workouts = await Workout.find(filter).populate({
      path: 'trainer',
      select: 'name email specialization profilePicture' // Select fields you want
    });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate({
      path: 'trainer',
      select: 'name email specialization bio profilePicture' // Select fields you want
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateWorkout = async (req, res) => {
  try {
    const { files } = req;
    const updates = { ...req.body };

    if (files?.video) {
      updates.videoUrl = await uploadToCloudinary(files.video[0].path, 'video');
      fs.unlinkSync(files.video[0].path);
    }

    if (files?.thumbnail) {
      updates.thumbnail = await uploadToCloudinary(files.thumbnail[0].path, 'image');
      fs.unlinkSync(files.thumbnail[0].path);
    }

    const workout = await Workout.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
