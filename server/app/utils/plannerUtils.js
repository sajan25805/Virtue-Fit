import { Planner } from "../models/Planner.js";

/**
 * Generate planner items for a user based on a program's day plan.
 * @param {ObjectId} userId - The user enrolling.
 * @param {Object} program - The full program document (with populated days).
 * @param {Date} [startDate=new Date()] - Optional start date.
 * @returns {Array} plannerItems - Prepared planner documents.
 */
export const generatePlannerItemsFromProgram = async (userId, program, startDate = new Date()) => {
  const plannerItems = [];

  for (let i = 0; i < program.days.length; i++) {
    const day = program.days[i];
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + i);

    if (day.workout) {
      plannerItems.push({
        user: userId,
        program: program._id,
        type: "workout",
        date: targetDate,
        data: day.workout,
      });
    }

    if (day.meal) {
      plannerItems.push({
        user: userId,
        program: program._id,
        type: "meal",
        date: targetDate,
        data: day.meal,
      });
    }

    if (day.snack) {
      plannerItems.push({
        user: userId,
        program: program._id,
        type: "snack",
        date: targetDate,
        data: day.snack,
      });
    }

    if (day.meditation) {
      plannerItems.push({
        user: userId,
        program: program._id,
        type: "meditation",
        date: targetDate,
        data: day.meditation,
      });
    }
  }

  return plannerItems;
};
