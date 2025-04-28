
import cron from "node-cron";
import { WorkoutProgress } from "../models/WorkoutProgress.js";
import { Notification } from "../models/Notification.js";

export const startWorkoutReminderCron = () => {
  cron.schedule('* * * * *', async () => {
    console.log("[CRON] Checking for incomplete workouts...");

    const tenSecondsAgo = new Date(Date.now() - 10 * 1000);

    const pendingWorkouts = await WorkoutProgress.find({
      isCompleted: false,
      startedAt: { $lte: tenSecondsAgo }
    });

    console.log(`[CRON] Found ${pendingWorkouts.length} pending workouts`);

    for (const progress of pendingWorkouts) {
      const alreadyNotified = await Notification.findOne({
        user: progress.user,
        link: `/workout/${progress.workout}`,
        type: "workout"
      });

      if (!alreadyNotified) {
        await Notification.create({
          user: progress.user,
          title: "Workout Reminder",
          message: "You started a workout but didn't complete it! Keep pushing 💪",
          type: "workout",
          link: `/workout/${progress.workout}`
        });
        console.log(`[CRON] Notification created for user ${progress.user}`);
      }
    }
  });
};
