import cron from "node-cron";
import { WorkoutProgress } from "../models/WorkoutProgress.js";
import { Notification } from "../models/Notification.js";

export const startWorkoutReminderCron = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const incomplete = await WorkoutProgress.find({
        isCompleted: false,
        createdAt: { $lt: oneHourAgo }
      }).populate("workout");

      for (const progress of incomplete) {
        const alreadyReminded = await Notification.findOne({
          user: progress.user,
          type: "reminder",
          message: { $regex: progress.workout.title }
        });

        if (!alreadyReminded) {
          await Notification.create({
            user: progress.user,
            title: "⏳ Incomplete Workout",
            message: `You haven't completed "${progress.workout.title}". Let's finish strong!`,
            type: "reminder",
            link: `/workout/${progress.workout._id}`
          });
        }
      }
    } catch (err) {
      console.error("Reminder Cron Error:", err.message);
    }
  });
};
