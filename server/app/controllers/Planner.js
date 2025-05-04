import { Planner } from "../models/Planner.js";
import { Program } from "../models/Program.js";

export const generatePlanner = async (req, res) => {
  try {
    const { userId } = req;
    const { programId } = req.params;

    const program = await Program.findById(programId)
      .populate("workouts")
      .populate("meals")
      .populate("snacks")
      .populate("meditations");

    if (!program) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    const now = new Date();
    const plannerItems = [];
    let day = new Date(now.getFullYear(), now.getMonth(), 1);

    const spreadItems = [
      ...program.workouts.map(i => ({ type: "workout", item: i })),
      ...program.meals.map(i => ({ type: "meal", item: i })),
      ...program.snacks.map(i => ({ type: "snack", item: i })),
      ...program.meditations.flat().map(i => ({ type: "meditation", item: i }))
    ];

    for (const obj of spreadItems) {
      plannerItems.push({ date: new Date(day), type: obj.type, item: obj.item._id });
      day.setDate(day.getDate() + 1);
    }

    const planner = await Planner.create({
      user: userId,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      items: plannerItems
    });

    res.status(201).json({ success: true, planner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPlanner = async (req, res) => {
  try {
    const { userId } = req;
    const now = new Date();
    const planner = await Planner.findOne({
      user: userId,
      month: now.getMonth() + 1,
      year: now.getFullYear()
    }).populate("items.item");

    res.status(200).json({ success: true, planner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markPlannerItemComplete = async (req, res) => {
  try {
    const { userId } = req;
    const { itemId } = req.params;

    const now = new Date();
    const planner = await Planner.findOne({
      user: userId,
      month: now.getMonth() + 1,
      year: now.getFullYear()
    });

    if (!planner) return res.status(404).json({ success: false, message: "Planner not found" });

    const item = planner.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    item.completed = true;
    await planner.save();

    res.status(200).json({ success: true, message: "Item marked as completed", item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
